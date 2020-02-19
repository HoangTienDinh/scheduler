import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "8am",
  },
  {
    id: 2,
    time: "10am",
    interview: {
      student: "HoHo T. Di",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "11am",
    interview: {
      student: "Kevin The Energy Drink Z",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "12pm",
    interview: {
      student: "Charles Chan",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: "last",
    time: "5pm"
  }

];




export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays ] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    axios.get("/api/days")
    .then((response) => {
      setDays(response.data)
    })
  }, []);

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
            days={days}
            day={day}
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


      {appointments.map(appointment => 
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