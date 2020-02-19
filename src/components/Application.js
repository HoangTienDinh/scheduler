import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from "../helpers/selectors"

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));

  // If we were to set individual states for the object, declaring the variables on line 19/20, then adding the below into the promise.all
  // setDays(days);
  // setAppointments(appointments);
  // setInterviewers(interviewers);


  //Original code for a single axios call, but needed to make multiple calls, so a promise refactored it all
  // useEffect(() => {  
  //   axios.get("/api/days")
  //   .then((response) => {
  //     setDays(response.data)
  //   })
  // }, []);

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          {/* Makes the list for the day */}
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />

        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {/* Calls the component to find all appointments for each day */}
        {getAppointmentsForDay(state, state.day).map(appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )}

      </section>
    </main>
  );
}