export function getAppointmentsForDay(state, day) {
  let appointmentArray = [];
  let result = [];

  for (const dayName of state.days) {
    if (dayName.name === day) {
      dayName.appointments.forEach(appointment => appointmentArray.push(appointment))
    }
  }

  appointmentArray.forEach((id) => {
    for (const key in state.appointments) {
      if (id === Number(key)) {
        result.push(state.appointments[id])
      }
    }
  })
  return result;
}

export function getInterview(state, interview) {
  let finalObj = {}

  if (!interview) {
    return null;
  }

  if (interview) {
    const { student } = interview

    for (const id in state.interviewers) {
      if (interview.interviewer === Number(id)) {
        let interviewer = state.interviewers[id]

        finalObj = { student, interviewer }

        // console.log('the finalObj:', finalObj)
        return finalObj;
      }
    }
  }

}

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  let result = [];

  for (const dayName of state.days) {
    if (dayName.name === day && dayName.interviewers) {
      dayName.interviewers.forEach(interviewers => interviewersArray.push(interviewers))
    }
  }

  interviewersArray.forEach( interviewersId => {
    result.push(state.interviewers[String(interviewersId)])
  })

  return result;
}