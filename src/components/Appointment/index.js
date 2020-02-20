import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"

import useVisualMode from "../../hooks/useVisualMode";

const axios = require('axios');

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const ON_SAVE = "SAVE";

  // console.log(props.interviewers)

  const { id, time, interview, interviewers, bookInterview } = props
  console.log(id, interview)



  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }; 

    bookInterview(id, interview)


    axios.put(`/api/appointments/${id}`, {
      id: {id},
      time: {time},
      interview: {name: {name}, interviewer: {interviewer}}
    })
    .then((res) => {console.log('hey res', res)})
    .catch((err) => console.log('hey err', err))


    transition(SHOW)
  }

  // console.log("appointment props:", props)

    return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      }
      
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