import { useEffect, useReducer } from "react";

const axios = require('axios');

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  console.log("start of reducer", state, action)

  switch (action.type) {
    case SET_DAY:
      return { 
        ...state,
        day: action.value
       }

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        interviewers: action.value.interviewers,
        appointments: action.value.appointments
       }

    case SET_INTERVIEW: 
      return {
        ...state,
        appointments: action.value.appointments,
        interview: action.value.interview
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
  }

  const [state, dispatch] = useReducer(reducer, initialState);


  const setDay = day => dispatch({type: "SET_DAY", value: day});

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, value: { ...state, interview: null } });
    })
     
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

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments }});
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/interviewers"),
      axios.get("/api/appointments")
    ])
    .then(([daysRes, interviewersRes, appointmentsRes]) => {
      let days = daysRes.data;
      let interviewers = interviewersRes.data;
      let appointments = appointmentsRes.data;

      dispatch({type: SET_APPLICATION_DATA, value: { days, interviewers, appointments }});
    })
  }, [])
  

  return { state, setDay, bookInterview, cancelInterview }
}