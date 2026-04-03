import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = {
    'red': 'bg-red-500 animate-pulse',
    'yellow': 'bg-yellow-500 animate-pulse',
    'green': 'bg-green-500 animate-pulse'
}

// type TrafficLightColor = 'red' | 'yellow' | 'green';

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
   const [light, setLight] = useState<TrafficLightColor>('red');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) return;
    // console.log('useEffect');
    const intervalId = setInterval(() => {
      // console.log(countdown);
      setCountdown((prev) => prev -1 );
    }, 1000);
    return () => {
      console.log('Cleanup effect');
      clearInterval(intervalId);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(5);
    if (light === 'red') {
      setLight('green')
      return;
    }
    if (light === 'yellow') {
      setLight('red')
      return;
    }
    if (light === 'green') {
      setLight('yellow')
      return;
    }
    
  }, [countdown, light]);

  return {
    // Props
    countdown: countdown,
    light: light,
    colors: colors,
  // Computed
    percentage: (countdown / 5) * 100,
    redLight: light === 'red' ? colors[light] : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors[light] : 'bg-gray-500',
    greenLight: light === 'green' ? colors[light] : 'bg-gray-500'
  // Method
  }
}
