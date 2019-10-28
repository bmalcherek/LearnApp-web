import React from 'react';
import PropTypes from 'prop-types';

import { getRandomInt } from '../../helpers';

import '../../styles/Skeleton.css';

const Skeleton = props => {
  let skeleton;
  switch (props.type) {
    case 'big':
      skeleton = (
        <div
          className="skeleton"
          id="skeleton-big"
          style={{ height: props.height }}
        />
      );
      break;
    default:
      skeleton = (
        <div
          className="skeleton"
          style={{ width: `${getRandomInt(50) + 20}%`, height: props.height }}
        />
      );
  }

  return <div id="skeleton-container">{skeleton}</div>;
};

Skeleton.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string
};

Skeleton.defaultProps = {
  type: '',
  height: '20px'
};

export default Skeleton;
