import React from "react";
import Tree from "react-d3-tree";
import Title from "../../components/Title";

const FrameTree = ({ tree, numNodes }) => {
  console.log(tree, numNodes);
  console.log(Math.min(1, 2 / Math.sqrt(numNodes)), Math.sqrt(numNodes), 2 / Math.sqrt(numNodes));
  return (
    <>
      {" "}
      <Title title={"Frame Tree"} id={"framesTree"} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "70vw",
            height: "90vh",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
          }}
        >
          <Tree
            data={tree}
            collapsible={true}
            pathFunc={"straight"}
            separation={{ nonSiblings: 1, siblings: 0.5 }}
            depthFactor={350}
            translate={{ x: window.innerWidth / 5, y: window.innerHeight / 2 }}
            zoom={2 / Math.sqrt(numNodes)}
            scaleExtent={{ max: 2, min: 0.1 }}
          />
        </div>
      </div>
    </>
  );
};

export default FrameTree;
