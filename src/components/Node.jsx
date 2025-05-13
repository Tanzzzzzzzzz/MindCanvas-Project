
import React from 'react';

const Node = ({ x, y }) => {
  return (
    <div className="node" style={{ top: y, left: x }}>
      🧠
    </div>
  );
};

export default Node;
