import React from 'react';
import './Marker.css';
import ReactTooltip from "react-tooltip";

const MarkerPin = (props) => {
    const { color, name, tooltip } = props;

    return (
      <div>
        <a data-tip={tooltip}>
        <div
            className="pin bounce"
            style={{ backgroundColor: color, cursor: 'pointer' }}
            title={name}
          />
          <div className="pulse" />
        </a>
        <ReactTooltip place="top" type="dark" effect="float" multiline={true}/>
      </div>
    );
  };

export default MarkerPin;