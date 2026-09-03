import { useEffect, useState } from "react";

function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 0,
}) {

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {

    let start = 0;

    const increment =
      value / (duration / 16);

    const timer = setInterval(() => {

      start += increment;

      if (start >= value) {

        start = value;

        clearInterval(timer);

      }

      setDisplayValue(start);

    }, 16);

    return () => clearInterval(timer);

  }, [value, duration]);

  return (
    <span>

      {displayValue.toFixed(decimals)}

    </span>
  );

}

export default AnimatedNumber;