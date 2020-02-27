import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require("classnames");

// When selecting an interviewer, this will display the avatar and name in the appointment card
export default function InterviewerListItem(props) {
  const { name, avatar, selected, onChange } = props;

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewClass} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
