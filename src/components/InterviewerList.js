import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {

  // console.log('inside the InterviewerList:', props)
  const interviewers = []

  for (const interviewerId in props.interviewers) {
    interviewers.push(props.interviewers[interviewerId])
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {

          interviewers.map(interviewer => 
            <InterviewerListItem 
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.value}
              onChange={event => props.onChange(interviewer.id)} 
            />
          )
        }
      </ul>
    </section>
 );
}