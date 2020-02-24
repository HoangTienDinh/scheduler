import { useEffect, useReducer } from "react";

const axios = require("axios");

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  // console.log(state, action);

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

    // case SET_INTERVIEW:
    //   return {
    //     ...state,
    //     appointments: action.value.appointments,
    //   }

    case SET_INTERVIEW: {
      // console.log('inside set interview:', action.value)
      const spotId = action.value.id;
      const setSpots = spots => {
        if (action.value.interview) {
          return action.value.spotId ? spots : spots - 1;
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

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: "SET_DAY", value: day });

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        value: { ...state, id, interview: null }
      });
    });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const setSpots = {
    //   ...state.appointments[id],

    // }

    // console.log(id);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments, id, interview } });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/interviewers"),
      axios.get("/api/appointments")
    ]).then(([daysRes, interviewersRes, appointmentsRes]) => {
      let days = daysRes.data;
      let interviewers = interviewersRes.data;
      let appointments = appointmentsRes.data;

      dispatch({
        type: SET_APPLICATION_DATA,
        value: { days, interviewers, appointments }
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
