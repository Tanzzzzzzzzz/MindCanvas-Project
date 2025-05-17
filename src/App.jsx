import React, { useState } from 'react';
import NodeCanvas from './components/NodeCanvas';

function App() {
  const [nodes, setNodes] = useState([]);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 300,
      title: `Node ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <button
        onClick={addNode}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Node
      </button>
      <NodeCanvas nodes={nodes} />
    </div>
  );
}

export default App;
