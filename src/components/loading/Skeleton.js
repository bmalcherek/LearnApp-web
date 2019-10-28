import React from 'react';
import PropTypes from 'prop-types';

import { getRandomInt } from '../../helpers';

import '../../styles/Skeleton.css';

const Skeleton = props => {
  let skeleton;
  switch (props.type) {
    case 'big':
      skeleton = <div className="skeleton" id="skeleton-big" />;
      break;
    default:
      skeleton = (
        <div
          className="skeleton"
          style={{ width: `${getRandomInt(50) + 20}%` }}
        />
      );
  }

  return <div id="skeleton-container">{skeleton}</div>;
};

Skeleton.propTypes = {
  type: PropTypes.string.isRequired
};

export default Skeleton;
