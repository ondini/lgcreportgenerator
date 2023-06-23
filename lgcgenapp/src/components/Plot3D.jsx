import React from "react";
import Plot from "react-plotly.js";
import { get3DPoints } from "../utils/dataProcessing";

const Plot3D = ({ data }) => {
  let coords = get3DPoints(data.LGC_DATA);
  const datas = {
    x: coords.map((coord) => coord[0]),
    y: coords.map((coord) => coord[1]),
    z: coords.map((coord) => coord[2]),
  };

  const layout = {
    title: "3D Scatter Plot",
    width: 1200,
    height: 1000,
    scene: {
      xaxis: { title: "X Axis" },
      yaxis: { title: "Y Axis" },
      zaxis: { title: "Z Axis" },
    },
  };

  return (
    <div>
      <Plot
        data={[
          {
            type: "scatter3d",
            mode: "markers",
            x: datas.x,
            y: datas.y,
            z: datas.z,
          },
          {
            type: "scatter3d",
            mode: "lines",
            x: datas.x,
            y: datas.y,
            z: datas.z,
          },
        ]}
        layout={layout}
      />
    </div>
  );
};

export default Plot3D;
