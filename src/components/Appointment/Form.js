import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";




export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const { interviewers, onCancel, onSave } = props

  // console.log('the form props:', onSave)

  const reset = () => {
    setName("");
    setInterviewer(null);
    setError("");
  }

  const cancel = () => {
    reset();
    onCancel();
  } 

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please set an interviewer")
      return;
    }

    setError("");
    onSave(name, interviewer);
    // console.log("inside the validate function", onSave(name, interviewer))
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder={"Enter Student Name"}
            onChange={(event) => setName(event.target.value)}

            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={validate} confirm>Save</Button>
      </section>
    </section>
  </main>
  )
}