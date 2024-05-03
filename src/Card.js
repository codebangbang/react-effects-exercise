import React, { useState } from "react";
import "./Card.css";

function Card({ name, image }) {
  const [angle, setAngle] = useState(Math.random() * 90 - 45);
  const transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  return <img style={{ transform }} className="Card" alt={name} src={image} />;
}

export default Card;
