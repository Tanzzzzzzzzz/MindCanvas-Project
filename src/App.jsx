
import React, { useState } from 'react';
import Node from './components/Node';
import './styles/canvas.css';

function App() {
  const [nodes, setNodes] = useState([]);
  
  const handleAddNode = (e) => {
    const newNode = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="canvas" onClick={handleAddNode}>
      {nodes.map((node) => (
        <Node key={node.id} x={node.x} y={node.y} />
      ))}
    </div>
  );
}

export default App;
