import React from "react";

const ConnectionLayer = ({ nodes, connections }) => {
  const getNodeCenter = (node) => ({
    x: node.x + 75,
    y: node.y + 25,
  });

  return (
    <svg className="absolute top-0 left-0 w-full h-full z-0">
      {connections.map((conn, idx) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);

        if (!fromNode || !toNode) return null;

        const from = getNodeCenter(fromNode);
        const to = getNodeCenter(toNode);

        return (
          <line
            key={idx}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="black"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

export default ConnectionLayer;