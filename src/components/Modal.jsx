import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function Modal() {
  const { selectedMeal, closeModal } = useGlobalContext(); //from context api
  const {
    strInstructions,
    strMeal: title,
    strMealThumb: img,
    strSource,
    strYoutube,
  } = selectedMeal;

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <div className="modal">
      <div className="modal-container" ref={ref}>
        <img src={img} alt={title} />
        <div className="modal-text">
          <h3>{title}</h3>
          <p>{strInstructions}</p>
          <div className="modal-links">
            <Link to={strSource}>Source Link</Link>
            <Link to={strYoutube}>Youtube</Link>
            <button onClick={() => closeModal()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
