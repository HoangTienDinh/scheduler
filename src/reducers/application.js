export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

// reducer function runs inside useApplicationData
// pending on the action the switch will start a case
export function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        interviewers: action.value.interviewers,
        appointments: action.value.appointments
      };

    case SET_INTERVIEW: {
      const spotId = action.value.id;
      const setSpots = spots => {
        if (action.value.interview) {
          return state.appointments[spotId].interview ? spots : spots - 1;
        } else {
          return spots + 1;
        }
      };

      const appointment = {
        ...state.appointments[spotId],
        interview: action.value.interview
      };

      const appointments = {
        ...state.appointments,
        [spotId]: appointment
      };

      return {
        ...state,
        appointments,
        days: state.days.map(day => {
          return day.name !== state.day
            ? day
            : { ...day, spots: setSpots(day.spots) };
        })
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
