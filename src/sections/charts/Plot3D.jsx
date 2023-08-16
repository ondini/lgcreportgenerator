import React from "react";
import Plot from "react-plotly.js";
import { Title } from "../../components";
import { PLOT_3D_HEIGHT, PLOT_3D_WIDTH } from "../../data/constants";

const Plot3D = ({ pointsCoords }) => {
  const layout = {
    width: PLOT_3D_WIDTH,
    height: PLOT_3D_HEIGHT,
    scene: {
      xaxis: { title: "X" },
      yaxis: { title: "Y", scaleanchor: "x" },
      zaxis: { title: "Z", scaleanchor: "x" },
    },
    showlegend: false,
    border: "1px solid #e0e0e0",
    margin: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Title title="3D Plot" id="plotPt3D" />
      <div
        style={{
          width: "70vw",
          height: PLOT_3D_WIDTH,
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <Plot
          data={[
            {
              type: "scatter3d",
              mode: "markers",
              x: pointsCoords.X,
              y: pointsCoords.Y,
              z: pointsCoords.Z,
            },
          ]}
          layout={layout}
        />
      </div>
    </div>
  );
};

export default Plot3D;
