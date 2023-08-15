//Link to Survey Pad input file clickable with ctrl

import { linkPathPlaceholder } from "../data/constants";

const SPLink = ({ title, line }) => {
  let clickHandler = (event) => {
    if (event.ctrlKey) {
      window.location.href = `surveypad://link//${linkPathPlaceholder},${line}`;
    }
  };
  return (
    <div onClick={clickHandler} className="link">
      {title}
    </div>
  );
};

export default SPLink;
