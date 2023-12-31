import React from "react";

const titleStyle = {
  marginTop: "3rem",
};

const Title = ({ title, id }) => {
  return (
    <div style={titleStyle} id={id}>
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
