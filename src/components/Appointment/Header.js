import React from "react";

// Seperates the appointment info with time slot text
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__seperator" />
    </header>
  );
}
