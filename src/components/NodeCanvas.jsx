import React, { useState } from "react";
import Draggable from "react-draggable";

const NodeCanvas = () => {
  const [nodes, setNodes] = useState([]);
  const [nodeId, setNodeId] = useState(1);

  const addNode = () => {
    const newNode = {
      id: nodeId,
      x: 100,
      y: 100,
      name: `Node ${nodeId}`,
      editing: false,
    };
    setNodes([...nodes, newNode]);
    setNodeId(nodeId + 1);
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  const startEditing = (id) => {
    setNodes(
      nodes.map((node) =>
        node.id === id ? { ...node, editing: true } : node
      )
    );
  };

  const stopEditing = (id, newName) => {
    setNodes(
      nodes.map((node) =>
        node.id === id ? { ...node, name: newName, editing: false } : node
      )
    );
  };

  const handleDrag = (e, data, id) => {
    setNodes(
      nodes.map((node) =>
        node.id === id
          ? { ...node, x: data.x, y: data.y }
          : node
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={addNode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Node
      </button>
      <div className="mt-4 relative w-full h-[80vh] bg-white rounded shadow overflow-hidden">
        {nodes.map((node) => (
          <Draggable
            key={node.id}
            position={{ x: node.x, y: node.y }}
            onDrag={(e, data) => handleDrag(e, data, node.id)}
          >
            <div className="absolute p-4 bg-green-300 rounded shadow-md min-w-[120px]">
              <div className="flex justify-between items-center">
                {node.editing ? (
                  <input
                    className="text-sm font-semibold bg-white p-1 rounded w-full"
                    type="text"
                    defaultValue={node.name}
                    autoFocus
                    onBlur={(e) => stopEditing(node.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        stopEditing(node.id, e.target.value);
                      }
                    }}
                  />
                ) : (
                  <span
                    className="text-sm font-semibold cursor-pointer"
                    onDoubleClick={() => startEditing(node.id)}
                  >
                    {node.name}
                  </span>
                )}
                <button
                  className="text-red-500 font-bold ml-2"
                  onClick={() => deleteNode(node.id)}
                >
                  ×
                </button>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default NodeCanvas;
