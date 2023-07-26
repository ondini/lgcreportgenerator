import React from "react";
import "./Title.css";

const Title = ({ title, id }) => {
  return (
    <div className="title" id={id}>
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
