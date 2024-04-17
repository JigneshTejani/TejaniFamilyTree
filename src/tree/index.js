import React from 'react';
import Tree from 'react-d3-tree';
import {useCenteredTree} from "./useCentered";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
    name: 'Ramji bhai', children: [{
        name: 'Valji bhai', children: [{
            name: 'Pravin bhai', children: [{name: 'Sarth',}, {name: 'Manali',},],
        }, {
            name: 'Haresh bhai', children: [{name: 'Yug',}, {name: 'Neksha',},],
        },],
    }, {
        name: 'Daya bhai', children: [{
            name: 'Nilesh bhai', children: [{name: 'Priyanshi',}, {name: 'Jash',},],
        }, {
            name: 'Jagdish bhai', children: [{name: 'Isha',}, {name: 'Man',},],
        },],
    }, {
        name: 'Gordhan bhai', children: [{
            name: 'Jayesh bhai', children: [{name: 'Vraj',}, {name: 'Kriva',},],
        }, {
            name: 'Ashvin bhai', children: [{name: 'Harvi',}, {name: 'Shivang',},],
        },],
    },]
};

export default function OrgChartTree() {
    const [dimensions, translate, containerRef] = useCenteredTree();

    return (// `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{width: '100vw', height: '100vh'}} ref={containerRef}>
            <Tree
                // pathFunc="step"
                orientation="vertical"
                allowForeignObjects={true}
                translate={translate}
                dimensions={dimensions} //control the size of the tree layout
                separation={{siblings: 1.60, nonSiblings: 1.60}}
                nodeSize={{x: 200, y: 200}}
                renderCustomNodeElement={(treeData) => <RenderCard data={{...treeData}}/>}
                initialDepth={1} // for visible first one row in tree
                data={orgChart}
            />
        </div>);
}

const RenderCard = React.memo(({data: {nodeDatum, toggleNode, foreignObjectProps = {}}}) => {
    return (<React.Fragment>
            <foreignObject
                {...foreignObjectProps}
                width="300"
                height="160"
                x="-150"
                y="-80"
            >
                <div className="card-container" onClick={toggleNode}>
                    <div className="card">
                        <div className="user">
                            <div className='user-avatar'>
                                <img src="https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png"/>
                                <p>{nodeDatum?.name || '-'}</p>
                            </div>

                            <div className='user-avatar'>
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/018/787/001/small/avatar-job-business-woman-flat-portrait-of-woman-png.png"/>
                                <p>{nodeDatum?.name || '-'}</p>
                            </div>
                        </div>
                        <div className="contact">
                            <p>9574357964</p>
                        </div>
                    </div>
                </div>
            </foreignObject>
        </React.Fragment>);
});
