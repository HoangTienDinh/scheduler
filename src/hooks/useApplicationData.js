import { useState, useEffect } from "react";

const axios = require('axios');


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
  };

  function bookInterview(id, interview) {
    console.log(id, interview);
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
      setState({
        ...state,
        appointments
      });
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

      setState((prevState) => ({...prevState, days, interviewers, appointments}))
      // Recognize that this is a destructured object, that pushes in new data to the state object array.
    })
  }, [])
  
  const setDay = day => setState(prev => ({ ...prev, day }));

  return { state, setDay, bookInterview, cancelInterview }
}