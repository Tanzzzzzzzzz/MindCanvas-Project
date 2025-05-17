import React from 'react';

const Node = ({ node }) => {
  return (
    <div
      className="absolute p-4 bg-white border border-gray-300 shadow-lg rounded w-40"
      style={{ left: node.x, top: node.y }}
    >
      <h2 className="text-lg font-semibold">{node.title}</h2>
    </div>
  );
};

export default Node;
