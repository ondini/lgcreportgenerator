import { Title, Table } from "../../components";
import { useState, useEffect } from "react";

export default function ObservationsTable({ observations }) {
  const measTypes = Object.keys(observations); // get all the used measurement types from the residuals data

  const createTable = (measType) => {
    // function that creates the histogram components for each of the residuals of the selected measurement type
    return <Table rows={observations[measType].data} columns={observations[measType].columnDetails} />;
  };

  let [table, setTable] = useState([]);
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type

  useEffect(() => {
    if (key) {
      setTable(createTable(key));
    }
  }, [key]);

  let measTypeButtons = measTypes.map((key) => {
    // create the measurement type buttons
    return (
      <button
        key={key}
        className="histsec-nav-button"
        onClick={() => {
          setKey(key);
        }}
      >
        {/* slice to remove the first character which is f in e.g.'fTSTN' */}
        {key.slice(1)}
      </button>
    );
  });

  return (
    <div>
      <Title title="Observations overview" id="observations" />
      <div className="histsec">
        <div className="histsec-nav">
          {" "}
          <h4>Measurement type </h4>
          {measTypeButtons}
        </div>
        {table}
      </div>
    </div>
  );
}
