import React, { useState } from "react";
import Node from "./Node";
import Xarrow from "react-xarrows";

export default function MindMap() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (e) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      x: e.clientX,
      y: e.clientY,
      text: `Node ${nodes.length + 1}`
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (id, x, y) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleConnect = (id) => {
    if (selectedNode) {
      setConnections([...connections, { from: selectedNode, to: id }]);
      setSelectedNode(null);
    } else {
      setSelectedNode(id);
    }
  };

  return (
    <div className="relative w-full h-[80vh] border rounded bg-white" onClick={addNode}>
      {nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          onDrag={updateNodePosition}
          onClick={() => handleConnect(node.id)}
        />
      ))}
      {connections.map((conn, idx) => (
        <Xarrow key={idx} start={conn.from} end={conn.to} />
      ))}
    </div>
  );
}
