import React from 'react';
import './Marker.css';
import ReactTooltip from "react-tooltip";
import { Button } from 'antd';

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
        <ReactTooltip html={true} place="top"  effect="solid" multiline={true} clickable={true}/>
      </div>
    );
  };

export default MarkerPin;