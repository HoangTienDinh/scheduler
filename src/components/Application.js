import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { 
    state, 
    setDay, 
    bookInterview, 
    cancelInterview 
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  // loads up the appointments card with all the appointment information
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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


  console.log('inside application', state)

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
        {/* {appointments.map(appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )} */}

        {schedule}

        <Appointment key="last" time="5pm" />


      </section>
    </main>
  );
}