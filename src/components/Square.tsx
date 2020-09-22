import React from "react";
import "../index.css";

type Square = {
  value: string;
  onClick(): void;
};

const Square = (props: Square) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
