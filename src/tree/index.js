import React from 'react';
import Tree from 'react-d3-tree';
import {useCenteredTree} from "./useCentered";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
    name: "Ratanpar Tejani Family Tree", children: [{
        name: "Naran", children: [{
            name: "Pancha", children: []
        }, {name: "Mavji", children: []}, {
            name: 'Ramji', children: [{
                name: 'Valji', children: [{
                    name: 'Pravin', children: [{
                        name: 'Sarth'
                    }, {name: 'Manali'}],
                }, {
                    name: 'Haresh', children: [{
                        name: 'Yug'
                    }, {name: 'Neksha'}],
                },]
            }, {
                name: 'Daya', children: [{
                    name: 'Nilesh', children: [{
                        name: 'Priyanshi'
                    }, {name: 'Jash'}],
                }, {
                    name: 'Jagdish', children: [{
                        name: 'Isha'
                    }, {name: 'Man'}],
                },]
            }, {
                name: 'Gordhan', children: [{
                    name: 'Jayesh', children: [{
                        name: 'Vraj'
                    }, {name: 'Kriva'}],
                }, {
                    name: 'Ashvin', children: [{
                        name: 'Harvi'
                    }, {name: 'Shivang'}],
                },]
            },]
        }, {
            name: "Chhagan", children: [{
                name: "Madhavji", children: [{name: "Dinesh"}, {name: "Janak"}, {name: "Suresh"}]
            }]
        },]
    }, {
        name: "Ramji", children: [{
            name: "Jadav", children: [{
                name: "Makod", children: [{
                    name: "Gordhan", children: [{
                        name: 'Tushar', children: [{
                            name: 'Dhruvaansh'
                        }]
                    }, {name: 'Jignesh'}],
                }, {
                    name: "Pravin", children: [{name: 'Rohit', children: [{name: 'Praj'}]}, {name: 'Ridham'}]
                }, {
                    name: "Late Bharat", children: [{name: 'Rajan'}, {name: 'Rutul'}]
                }]
            }]
        }, {
            name: "Jina",
            children: [{name: 'Mohan', children: [{name: 'Vasharam', children: [{name: "Haresh", children: [{name: "Jenish"}]}, {name: "Raju", children: [{name: "Tilak"}]}]}]}]
        }]
    }]
};

export default function OrgChartTree() {
    const [dimensions, translate, containerRef] = useCenteredTree();

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
                initialDepth={6} // for visible first one row in tree
                data={orgChart}
            />
        </div>
    </React.Fragment>);
}

const RenderCard = React.memo(({data: {nodeDatum, toggleNode, foreignObjectProps = {}}}) => {
    return (<React.Fragment>
        <foreignObject
            {...foreignObjectProps}
            width="200"
            height="300"
            x="-100"
            y="-150"
        >
            <div className="card-container" onClick={toggleNode}>
                <div className="card">
                    <div className="user">
                        <div className='user-avatar'>
                            <img src="https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png"/>
                            <p>{nodeDatum?.name || '-'}</p>
                        </div>

                        {/*<div className='user-avatar'>*/}
                        {/*    <img src="https://static.vecteezy.com/system/resources/thumbnails/018/787/001/small/avatar-job-business-woman-flat-portrait-of-woman-png.png"/>*/}
                        {/*    <p>{nodeDatum?.name || '-'}</p>*/}
                        {/*</div>*/}
                    </div>
                    <div className="contact">
                        <p>9574357964</p>
                    </div>
                </div>
            </div>
        </foreignObject>
    </React.Fragment>);
});
