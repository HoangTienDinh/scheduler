import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";

  // console.log(props.interviewers)

  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }; 
    
    transition(SAVING)

    bookInterview(id, interview)
    .then(() => transition(SHOW))

  }

  function deleteInterview() {
    transition(DELETE)

    cancelInterview(id)
    .then(() => transition(EMPTY))
  }

  // console.log("appointment props:", props)

    return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && 
      <Empty 
        onAdd={() => transition(CREATE)} 
      />}
      
      {mode === SHOW && 
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={deleteInterview}
      />}
      
      {mode === CREATE && 
      <Form 
        key={id}
        interviewers={interviewers}
        onSave={save}
        onCancel={back}
      />}

      {mode === SAVING &&
      <Status
        message="Saving"
      />}

      {mode === DELETE &&
      <Status 
        message="Deleting"
      />}
        



    </article>
  );
}