import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);
  // console.log('here is history:', history)

  function transition(input, replace) {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(input)
  }

  function back() {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  return { mode, transition, back }
}