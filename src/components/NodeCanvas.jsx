import React, { useState } from "react";
import Draggable from "react-draggable";
import Xarrow from "react-xarrows";

const NodeCanvas = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dragFrom, setDragFrom] = useState(null);

  const addNode = () => {
    const id = "node-" + (nodes.length + 1);
    const newNode = {
      id,
      title: "Node " + (nodes.length + 1),
      x: 100 + nodes.length * 50,
      y: 100 + nodes.length * 50,
    };
    setNodes([...nodes, newNode]);
  };

  const updatePosition = (id, x, y) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleStartConnection = (id) => {
    setDragFrom(id);
  };

  const handleDropConnection = (targetId) => {
    if (dragFrom && dragFrom !== targetId) {
      setConnections([...connections, { from: dragFrom, to: targetId }]);
    }
    setDragFrom(null);
  };

  return (
    <div>
      <button
        onClick={addNode}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Add Node
      </button>
      <div className="relative w-full h-[80vh] bg-white border rounded">
        {nodes.map(node => (
          <Draggable
            key={node.id}
            position={{ x: node.x, y: node.y }}
            onStop={(_, data) => updatePosition(node.id, data.x, data.y)}
          >
            <div
              id={node.id}
              className="absolute p-2 bg-green-300 rounded shadow cursor-move select-none"
              onClick={() => handleDropConnection(node.id)}
            >
              <div className="flex items-center justify-between gap-2">
                <strong>{node.title}</strong>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNodes(nodes.filter(n => n.id !== node.id));
                    setConnections(connections.filter(
                      c => c.from !== node.id && c.to !== node.id
                    ));
                  }}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartConnection(node.id);
                }}
                className="mt-1 px-2 py-1 bg-blue-600 text-white rounded text-xs"
              >
                Connect →
              </button>
            </div>
          </Draggable>
        ))}
        {connections.map((conn, index) => (
          <Xarrow
            key={index}
            start={conn.from}
            end={conn.to}
            path="smooth"
            strokeWidth={2}
            color="black"
          />
        ))}
      </div>
    </div>
  );
};

export default NodeCanvas;
