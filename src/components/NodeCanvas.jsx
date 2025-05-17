import React, { useState, useRef } from "react";

const NodeCanvas = () => {
  const [nodes, setNodes] = useState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const draggingNodeId = useRef(null);

  const handleAddNode = () => {
    const newNode = {
      id: nodeIdCounter,
      x: 100 + nodes.length * 20,
      y: 100 + nodes.length * 20,
    };
    setNodes((prev) => [...prev, newNode]);
    setNodeIdCounter((prev) => prev + 1);
  };

  const handleDeleteNode = (id) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
  };

  const handleMouseDown = (e, id) => {
    draggingNodeId.current = id;
  };

  const handleMouseMove = (e) => {
    if (draggingNodeId.current !== null) {
      const updatedNodes = nodes.map((node) =>
        node.id === draggingNodeId.current
          ? {
              ...node,
              x: e.clientX - 60,
              y: e.clientY - 30,
            }
          : node
      );
      setNodes(updatedNodes);
    }
  };

  const handleMouseUp = () => {
    draggingNodeId.current = null;
  };

  return (
    <div
      className="w-full h-screen bg-gray-100 p-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button
        onClick={handleAddNode}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
      >
        Add Node
      </button>

      <div className="relative w-full h-full border border-gray-300 bg-white rounded">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-32 h-16 bg-green-300 rounded shadow-md cursor-move flex items-center justify-between p-2"
            style={{ left: node.x, top: node.y }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            <span className="text-sm font-bold text-gray-800">Node {node.id}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag on delete
                handleDeleteNode(node.id);
              }}
              className="ml-2 text-red-600 font-bold hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeCanvas;
