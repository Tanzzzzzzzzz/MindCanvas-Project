import React, { useState, useRef, useEffect } from "react";

const Node = ({ id, x, y, text, onUpdate, onDelete }) => {
  const [position, setPosition] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const offset = useRef({ x: 0, y: 0 });

  const nodeRef = useRef(null);

  useEffect(() => {
    onUpdate(id, { x: position.x, y: position.y });
  }, [position]);

  const handleMouseDown = (e) => {
    // Prevent dragging when editing
    if (editing) return;

    setDragging(true);
    const rect = nodeRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleInputBlur = () => {
    setEditing(false);
    onUpdate(id, { text: inputValue });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
      onUpdate(id, { text: inputValue });
    }
  };

  return (
    <div
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className="absolute px-4 py-2 bg-green-300 rounded shadow-md cursor-move select-none"
      style={{ left: position.x, top: position.y }}
    >
      {editing ? (
        <input
          type="text"
          value={inputValue}
          autoFocus
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="px-2 py-1 rounded border border-gray-300"
        />
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-bold">{text}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="text-red-600 font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Node;
