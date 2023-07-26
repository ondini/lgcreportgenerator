import React from "react";
import Plot from "react-plotly.js";
import { get3DPoints } from "../../data_processing/dataProcessing";
import Title from "../../components/Title";

const Plot3D = ({ data }) => {
  let coords = get3DPoints(data.LGC_DATA);
  const datas = {
    x: coords.map((coord) => coord[0]),
    y: coords.map((coord) => coord[1]),
    z: coords.map((coord) => coord[2]),
  };

  const layout = {
    width: 1200,
    height: 1000,
    scene: {
      xaxis: { title: "X" },
      yaxis: { title: "Y" },
      zaxis: { title: "Z" },
    },
    showlegend: false,
  };

  return (
    <div>
      <Title title="3D Plot" id="plotPt3D" />
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
