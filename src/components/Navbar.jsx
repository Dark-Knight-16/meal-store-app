import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

function Navbar() {
  const { goHome, setSearchTerm } = useGlobalContext();
  return (
    <div className="navbar">
      <div className="nav">
        <div className="logo">
          <Link to={"/"} onClick={() => goHome()}>
            Meal Store
          </Link>
        </div>

        <ul className="navlinks">
          <li>
            <Link to={"/"} onClick={() => goHome()}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"favorites"}
              onClick={() => {
                setSearchTerm("");
              }}
            >
              My Favorites
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
