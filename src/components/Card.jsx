import React from "react";
import "./Card.css"; // Import the CSS file

const Card = ({ children, image }) => {
  return (
    /* From Uiverse.io by htwarriors108 */
    <div className="card">
      <span></span>
      <span className="image-container">
        <img src={image} alt={children} className="card-image" />
      </span>
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
