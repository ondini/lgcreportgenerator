import React from "react";
import Tree from "react-d3-tree";
import Title from "../../components/Title";
import { getFrames } from "../../data_processing/processing";

const FrameTree = ({ tree }) => {
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
            translate={{ x: 400, y: 600 }}
            zoom={0.2}
          />
        </div>
      </div>
    </>
  );
};

export default FrameTree;