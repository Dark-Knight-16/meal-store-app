import "./App.css";
import { useGlobalContext } from "./context";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Modal from "./components/Modal";

function App() {
  const { showModal } = useGlobalContext(); // from context api

  return (
    <div className="App">
      <Navbar />
      <Outlet />
      {showModal && <Modal />}
    </div>
  );
}

export default App;
