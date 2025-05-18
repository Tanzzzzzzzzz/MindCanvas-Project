import React from "react";
import NodeCanvas from "./components/NodeCanvas";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">MindCanvas</h1>
      <NodeCanvas />
    </div>
  );
};

export default App;