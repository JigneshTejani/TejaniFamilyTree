import React, {useState} from 'react';
import Tree from 'react-d3-tree';
import {useCenteredTree} from "./useCentered";
import {stratify} from 'd3-hierarchy';
import {getConvertedTreeData} from "../helper/function";
import axios from 'axios';

export default function OrgChartTree() {
    const [dimensions, translate, containerRef] = useCenteredTree();
    const familyTree = stratify().id((d) => d.name).parentId((d) => d.father)(getConvertedTreeData());

    return (<React.Fragment>
        <div id="treeWrapper" style={{width: '100vw', height: '100vh'}} ref={containerRef}>
            <Tree
                // pathFunc="step"
                orientation="vertical"
                allowForeignObjects={true}
                translate={translate}
                dimensions={dimensions} //control the size of the tree layout
                scaleExtent={{max: 10, min: 0.3}}
                separation={{siblings: 1, nonSiblings: 1.60}}
                nodeSize={{x: 160, y: 300}}
                renderCustomNodeElement={(treeData) => <RenderCard data={{...treeData}}/>}
                initialDepth={1} // for visible first one row in tree
                data={familyTree}
                enableLegacyTransitions
            />
        </div>
    </React.Fragment>);
}

const RenderCard = React.memo(({data: {nodeDatum, toggleNode, foreignObjectProps = {}}}) => {
    const [open, setOpen] = useState("")
    const data = nodeDatum?.data

    const name = data?.name_guj?.split(" ")?.[0]
    const spouse = data?.spouse_guj?.split(" ")?.[0]
    const number = data?.number
    const onPaste = (e) => {
        if (e.clipboardData === false) return false;
        const items = e.clipboardData.items;
        if (items === undefined) return false;

        for (let i = 0; i < items.length; i++) {
            // Skip content if not image
            if (items[i].type.indexOf('image') === -1) continue;
            if (e && e.preventDefault) e.preventDefault();
            // Retrieve image on clipboard as blob
            const files = items[i].getAsFile();
            const data = new FormData()
            data.append('file', files)
            data.append('name', open)

            axios.post('http://localhost:8080/upload', data).then(res => {
                console.log({res})
                setOpen('')
            })
        }
        return false;
    }

    return (<React.Fragment>
        <foreignObject
            {...foreignObjectProps}
            width="160"
            height="300"
            x="-80"
            y="-100"
        >
            {data?.name && <div className="card-container" onClick={toggleNode}>
                {data.name === "tejaniparivar tejaniparivar" ? <div className="root-card">
                        <p>{data?.name_guj}</p>
                    </div>
                    :
                    <div className="card">
                        <div className="user">
                            <div className='user-avatar'>
                                <img
                                    src={`./TejaniFamilyTree/images/${data?.name}.png` ?? "./TejaniFamilyTree/male.png"}

                                    onError={e => e.target.src = "./TejaniFamilyTree/male.png"}
                                />
                                {process.env.NODE_ENV === 'development' && <button onClick={e => {
                                    e?.preventDefault()
                                    e?.stopPropagation()
                                    setOpen(data?.name)
                                }}>name
                                </button>}
                                <p>{name}</p>
                            </div>

                            {spouse && <div className='user-avatar'>
                                <img
                                    src={`./TejaniFamilyTree/images/${data?.spouse}.png` ?? "./TejaniFamilyTree/female.png"}
                                    onError={e => e.target.src = "./TejaniFamilyTree/female.png"}
                                />
                                {process.env.NODE_ENV === 'development' && <button onClick={e => {
                                    e?.preventDefault()
                                    e?.stopPropagation()
                                    setOpen(data?.spouse)
                                }}>spouse
                                </button>}
                                <p>{spouse}</p>
                            </div>}
                        </div>
                        {number && <div className="contact"><p>{number}</p></div>}
                    </div>
                }
                {!!open?.length && <div style={{position: 'absolute', top: 0, left: '36px', height: '120px', width: '160px', backgroundColor: "white"}}>
                    <button onClick={() => setOpen("")}>Close</button>
                    <input type="text" onPaste={onPaste} autoFocus={true}/>
                    {data?.photo && <a href={data?.photo} target="_blank">name</a>} <br/>
                    {data?.spouse_photo && <a href={data?.spouse_photo} target="_blank">spouse</a>}
                    <p>{open}</p>
                </div>}
            </div>}
        </foreignObject>
    </React.Fragment>);
});
