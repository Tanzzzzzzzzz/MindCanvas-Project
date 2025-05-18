import React, { useState } from "react";

const NodeCanvas = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 300,
      label: "New Node",
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={addNode}
      >
        Add Node
      </button>
      <div className="relative w-full h-[600px] border rounded bg-white">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-36 p-4 rounded shadow bg-yellow-100"
            style={{ left: node.x, top: node.y }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeCanvas;