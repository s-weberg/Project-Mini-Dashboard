import "./App.css";
import Form from "./components/Form.tsx";
import Header from "../Header.tsx";
import TODOHero from "./components/TODOHero.tsx";
import TODOList from "./components/TODOList.tsx";

function App() {
  return (
    <div className="bg-amber-700 min-h-screen flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl text-white">Welcome to the Mini Dashboard 🚀</h1>
      <div className="bg-amber-100 mt-4 p-4 rounded-lg shadow-md">
        <p className="text-black">
          This is a simple dashboard layout using Tailwind CSS.
        </p>
        <div className="wrapper">
          <Header />
          <TODOHero todos_completed={0} total_todos={0} />
          <Form />
          <TODOList todos={[]} />
        </div>
      </div>
    </div>
  );
}

export default App;

/*

import React from "react";
import Form from "@/components/Form";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";
function Home() {
  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={0} total_todos={0} />
      <Form />
      <TODOList todos={[]} />
    </div>
  );
}
export default Home;

<div className="flex items-center mt-7 text-black">
          <input type="checkbox" className="mt-2" />
          text Item 1 from input
        </div>
        <div className="flex items-center mt-4 text-black">
          <textarea
            className="InputTextArea p-1"
            placeholder="Add new item"
          ></textarea>
        </div>
        <button className="bg-amber-700 text-white px-4 py-2 rounded mt-4 hover:bg-amber-800">
          Add Item
        </button>
      </div>
      */
