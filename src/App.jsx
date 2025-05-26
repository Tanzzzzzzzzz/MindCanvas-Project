import React, { useState } from "react";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [dragging, setDragging] = useState(null);

  const addNode = () => {
    setNodes([
      ...nodes,
      {
        id: Date.now(),
        x: 100,
        y: 100,
        label: "New Node",
      },
    ]);
  };

  const handleMouseDown = (e, id) => {
    setDragging({ id, offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const updated = nodes.map((node) =>
        node.id === dragging.id
          ? { ...node, x: e.clientX - dragging.offsetX, y: e.clientY - dragging.offsetY }
          : node
      );
      setNodes(updated);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  return (
    <div
      className="w-full h-screen bg-gray-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={addNode}
      >
        Add Node
      </button>
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute bg-white border border-gray-300 rounded shadow px-4 py-2 cursor-move"
          style={{ top: node.y, left: node.x }}
          onMouseDown={(e) => handleMouseDown(e, node.id)}
        >
          {node.label}
          <button
            className="ml-2 text-red-500"
            onClick={() => deleteNode(node.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
