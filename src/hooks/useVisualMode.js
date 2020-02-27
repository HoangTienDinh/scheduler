import { useState } from "react";

// function allows for navigating through the page, pending on the mode that is set
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(input, replace) {
    if (!replace) {
      setHistory(prev => [...prev, input]);
      return;
    }
    setHistory(prev => [...prev.slice(0, -1), input])  
  }
  
  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  return { mode: history[history.length - 1], transition, back }
}
