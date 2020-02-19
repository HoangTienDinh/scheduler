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
      // setDays(days);
      // setAppointments(appointments);
      // setInterviewers(interviewers);
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


        {getAppointmentsForDay(state, state.day).map(appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )}


      </section>
    </main>
  );
}

// {
//   props.days.map(day => 
//     <DayListItem 
//       key={day.id}
//       name={day.name}
//       spots={day.spots}
//       selected={day.name === props.day}
//       setDay={props.setDay} 
//     />
//   )
// }