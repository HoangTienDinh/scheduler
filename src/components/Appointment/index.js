import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"

import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // console.log(props.interviewers)

  const { id, time, interview, interviewers, bookInterview } = props


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer

    };


    // console.log(interview)
    bookInterview(id, interview)

    return interview

  }

  // console.log("appointment props:", props)

    return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      
      {mode === CREATE && 
      <Form 
        key={id}
        interviewers={interviewers}

        onSave={save}
        onCancel={back}
        
        
        />}


    </article>
  );
}