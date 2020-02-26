import { useEffect, useReducer } from "react";

import {
  reducer,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW
} from "reducers/application";

// const axios = require("axios");
import axios from "axios";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

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
