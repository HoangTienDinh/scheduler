import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  // const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("appointment props:", props)

    return (
    <article className="appointment">
      <Header time={props.time} />

      {/* {props.interview ? 
      <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}/> : 
      <Empty />} */}

      {mode === EMPTY && <Empty onAdd={props.onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}




    </article>
  );
}