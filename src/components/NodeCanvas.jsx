// src/components/NodeCanvas.jsx
import React, { useState } from "react";
import Draggable from "react-draggable";

const NodeCanvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = () => {
    const newNode = {
      id: nodeId,
      label: `Node ${nodeId}`,
      x: 100 + nodes.length * 60,
      y: 100 + nodes.length * 60,
    };
    setNodes([...nodes, newNode]);
    setNodeId(nodeId + 1);
  };

  const deleteNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
    setEdges(edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const updateNodePosition = (id, x, y) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, x, y } : node
      )
    );
  };

  const handleNodeClick = (id) => {
    if (selectedNode === null) {
      setSelectedNode(id);
    } else if (selectedNode === id) {
      setSelectedNode(null); // unselect
    } else {
      setEdges([...edges, { source: selectedNode, target: id }]);
      setSelectedNode(null);
    }
  };

  const renameNode = (id, newLabel) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, label: newLabel } : node
      )
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={addNode}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
      >
        Add Node
      </button>

      <div className="relative w-full h-[600px] border rounded bg-white">
        {/* SVG for edges */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {edges.map((edge, index) => {
            const source = nodes.find((n) => n.id === edge.source);
            const target = nodes.find((n) => n.id === edge.target);
            if (!source || !target) return null;
            return (
              <line
                key={index}
                x1={source.x + 72 / 2}
                y1={source.y + 64 / 2}
                x2={target.x + 72 / 2}
                y2={target.y + 64 / 2}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <Draggable
            key={node.id}
            defaultPosition={{ x: node.x, y: node.y }}
            onStop={(_, data) =>
              updateNodePosition(node.id, data.x, data.y)
            }
          >
            <div
              onClick={() => handleNodeClick(node.id)}
              className={`absolute w-36 p-4 rounded shadow ${
                selectedNode === node.id ? "bg-yellow-300" : "bg-green-300"
              }`}
              style={{ cursor: "move" }}
            >
              <div className="flex justify-between items-center">
                <strong>{node.label}</strong>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNode(node.id);
                  }}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                className="mt-2 p-1 w-full text-sm rounded"
                value={node.label}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => renameNode(node.id, e.target.value)}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default NodeCanvas;
