import {useState} from "react";

export const useCounter = (onMaxPointsReached: () => void) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count + 1;

    setCount(newCount);
    if (newCount === 30) {
      onMaxPointsReached();
    }
  };
  const decrement = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  const reset = () => setCount(0);

  return {count, increment, decrement, reset};
};
