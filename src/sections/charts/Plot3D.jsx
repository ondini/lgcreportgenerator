import React from "react";
import Plot from "react-plotly.js";
import { get3DPoints } from "../../data_processing/processing";
import Title from "../../components/Title";
import { PLOT_3D_HEIGHT, PLOT_3D_WIDTH } from "../../data/constants";

const Plot3D = ({ data }) => {
  let coords = get3DPoints(data.LGC_DATA);
  const datas = {
    x: coords.map((coord) => coord[0]),
    y: coords.map((coord) => coord[1]),
    z: coords.map((coord) => coord[2]),
  };

  const layout = {
    width: PLOT_3D_WIDTH,
    height: PLOT_3D_HEIGHT,
    scene: {
      xaxis: { title: "X" },
      yaxis: { title: "Y" },
      zaxis: { title: "Z" },
      aspectmode: "cube", // Set aspect mode to 'cube'
      aspectratio: { x: 1, y: 1, z: 1 }, // Set equal aspect ratios for all axes
    },
    showlegend: false,
    border: "1px solid #e0e0e0",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Title title="3D Plot" id="plotPt3D" />
      <div
        style={{
          width: PLOT_3D_WIDTH,
          height: PLOT_3D_HEIGHT,
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <Plot
          data={[
            {
              type: "scatter3d",
              mode: "markers",
              x: datas.x,
              y: datas.y,
              z: datas.z,
            },
          ]}
          layout={layout}
        />
      </div>
    </div>
  );
};

export default Plot3D;
