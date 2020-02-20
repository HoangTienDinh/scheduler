import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
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
