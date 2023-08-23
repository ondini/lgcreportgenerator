import { linkPathPlaceholder } from "../data/constants";

const SPLink = ({ title, line, style = {} }) => {
  //Link to Survey Pad input file clickable with ctrl
  let clickHandler = (event) => {
    if (event.ctrlKey) {
      window.location.href = `surveypad://link//${linkPathPlaceholder},${line}`;
    }
  };
  return (
    <span style={{ ...style }} onClick={clickHandler} className="link">
      {title}
    </span>
  );
};

export default SPLink;
