import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');



export default function InterviewerListItem(props) {

  // console.log('inside the interviewlistitem', props)

  const { name, avatar, selected , onChange } = props;

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={interviewClass} onClick={onChange}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {/* {props.selected ? props.name : ''} */}
      {selected && name}
    </li>
  )
}