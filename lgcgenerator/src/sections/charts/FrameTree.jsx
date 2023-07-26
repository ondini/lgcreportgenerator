import React from "react";
import Tree from "react-d3-tree";
import Title from "../../components/Title";
import { getFrameTree } from "../../data_processing/processing";

const FrameTree = ({ data }) => {
  const myTreeData = getFrameTree(data.LGC_DATA);

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
          }}
        >
          <Tree
            data={myTreeData}
            collapsible={false}
            pathFunc={"straight"}
            separation={{ nonSiblings: 1, siblings: 0.5 }}
            depthFactor={350}
          />
        </div>
      </div>
    </>
  );
};

export default FrameTree;
