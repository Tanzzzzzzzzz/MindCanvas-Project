// src/App.jsx
import React, { useState } from 'react';
import Node from './components/Node';

function App() {
  const [nodes, setNodes] = useState([]);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      x: 100 + nodes.length * 20,
      y: 100 + nodes.length * 20,
      title: `Idea ${nodes.length + 1}`
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="h-screen w-screen bg-gray-100 relative overflow-hidden">
      <button
        className="m-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={addNode}
      >
        Add Node
      </button>
      <div className="absolute inset-0">
        {nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

export default App;
