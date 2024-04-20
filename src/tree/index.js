import React from 'react';
import Tree from 'react-d3-tree';
import {useCenteredTree} from "./useCentered";
import treeJson from './tree.json';
import {stratify} from 'd3-hierarchy';
import {getConvertedTreeData} from "../helper/function";

export default function OrgChartTree() {
    const [dimensions, translate, containerRef] = useCenteredTree();
    console.log(getConvertedTreeData())
    const familyTree = stratify().id((d) => d.name).parentId((d) => d.father)(getConvertedTreeData());

    return (<React.Fragment>
        <div id="treeWrapper" style={{width: '100vw', height: '100vh'}} ref={containerRef}>
            <Tree
                // pathFunc="step"
                orientation="vertical"
                allowForeignObjects={true}
                translate={translate}
                dimensions={dimensions} //control the size of the tree layout
                separation={{siblings: 1.60, nonSiblings: 1.60}}
                nodeSize={{x: 200, y: 300}}
                renderCustomNodeElement={(treeData) => <RenderCard data={{...treeData}}/>}
                initialDepth={1} // for visible first one row in tree
                data={familyTree}
            />
        </div>
    </React.Fragment>);
}

const RenderCard = React.memo(({data: {nodeDatum, toggleNode, foreignObjectProps = {}}}) => {
    const data = nodeDatum?.data

    const id = data?.unique_id
    const name = data?.name?.split(" ")?.[0]
    const spouse = data?.spouse?.split(" ")?.[0]
    const number = data?.number
    return (<React.Fragment>
        <foreignObject
            {...foreignObjectProps}
            width="200"
            height="300"
            x="-100"
            y="-100"
        >
            <div className="card-container" onClick={toggleNode}>
                <div className="card">
                    <div className="user">
                        <div className='user-avatar'>
                            <img src="https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png"/>
                            <p>{(id !== '1') ? `${name} Bhai` : data?.name}</p>
                        </div>

                        {spouse && <div className='user-avatar'>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/018/787/001/small/avatar-job-business-woman-flat-portrait-of-woman-png.png"/>
                            <p>{spouse} Ben</p>
                        </div>}
                    </div>
                    {number && <div className="contact"><p>{number}</p></div>}
                </div>
            </div>
        </foreignObject>
    </React.Fragment>);
});
