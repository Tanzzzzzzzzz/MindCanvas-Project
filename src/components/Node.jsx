// src/components/Node.jsx
import React, { useState } from 'react';

const Node = ({ node }) => {
  const [pos, setPos] = useState({ x: node.x, y: node.y });

  const handleDrag = (e) => {
    setPos({
      x: e.clientX - 50,
      y: e.clientY - 20,
    });
  };

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded shadow px-4 py-2 cursor-move"
      style={{ top: pos.y, left: pos.x }}
      onMouseDown={(e) => {
        e.preventDefault();
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', () => {
          window.removeEventListener('mousemove', handleDrag);
        }, { once: true });
      }}
    >
      {node.title}
    </div>
  );
};

export default Node;
