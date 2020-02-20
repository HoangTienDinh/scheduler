import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode) {
    setMode(mode)
  }


  function back() {

  }

  return { mode, transition, back }
}
