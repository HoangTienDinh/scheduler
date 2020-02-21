import React from "react";
import DayListItem from "./DayListItem"

// const classNames =require('classnames');

export default function DayList(props) {
    console.log('clicking the days', props)
    return (
      <ul>
        {
          props.days.map(day => 
            <DayListItem 
              key={day.id}
              name={day.name}
              spots={day.spots}
              selected={day.name === props.day}
              setDay={props.setDay} 
            />
          )
        }
      </ul>
   );
 }