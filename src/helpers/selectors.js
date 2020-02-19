

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