import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

const FormatSpots = ((props) => {
  if (props.spots === 1) {
    return <h3 className="text--light">{props.spots} spot remaining</h3>
  }

  if (props.spots === 0) {
    return <h3 className="text--light">no spots remaining</h3>
  }

  return <h3 className="text--light">{props.spots} spots remaining</h3>

})


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <FormatSpots spots = {props.spots}/>
    </li>
  );
}


// USING TERNARY OPERATOR
// export default function DayListItem(props) {
//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": props.spots
//   })
//   return (
//     <li className={dayClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{ props.spots > 1 ? props.spots + " spots remaining" : (props.spots === 1) ? "1 spot remaining" : "no spots remaining" } </h3>
//     </li>
//   );
// }