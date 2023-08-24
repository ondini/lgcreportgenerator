import { Title, Table } from "../../components";
import { useState, useEffect } from "react";

import "./ObservationsTable.css";

export default function ObservationsTable({ observations }) {
  const measTypes = Object.keys(observations); // get all the used measurement types from the observations data

  let [table, setTable] = useState([]);
  let [key, setKey] = useState(measTypes[0]); // state of the currently active measurement type

  useEffect(() => {
    if (key) {
      setTable(
        <div key={key} className="obstable-table">
          <Table rows={observations[key].data} columns={observations[key].columnDetails} />
        </div>
      );
    }
  }, [key, observations]);

  let measTypeButtons = measTypes.map((key) => {
    // create the measurement type buttons
    return (
      <button
        key={key}
        className="obstable-nav-button"
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
      <div className="obstable-container">
        <div className="obstable-nav">
          {" "}
          <h4>Measurement type </h4>
          {measTypeButtons}
        </div>
        {table}
      </div>
    </div>
  );
}
