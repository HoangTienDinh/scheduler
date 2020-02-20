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
  let appointmentArray = [];
  let interviewersArray = [];
  let result = [];

  // console.log(state.days)
  // console.log(day)

  for (const dayName of state.days) {
    if (dayName.name === day) {
      dayName.appointments.forEach(appointment => appointmentArray.push(appointment))
      // console.log(appointmentArray)
    }
  }

  appointmentArray.forEach( appointmentId => {
    if (state.appointments[String(appointmentId)].interview){
      interviewersArray.push(state.appointments[String(appointmentId)].interview.interviewer)
    }
  })

  interviewersArray.forEach( interviewersId => {
    result.push(state.interviewers[String(interviewersId)])
  })

  return result;
}