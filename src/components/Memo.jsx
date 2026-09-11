// i want to useMemo to memoize the result of a function that takes a long time to compute and  i wan tto used for prime number checking
import  { useState, useMemo } from 'react';

function Memo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
    const expensiveComputation = (num) => {
        console.log('Computing...');
        let isPrime = true;
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {  
                isPrime = false;
                break;
            }
        }
        return isPrime ? `${num} is a prime number` : `${num} is not a prime number`;
    }
    const memoizedValue = useMemo(() => expensiveComputation(count), [count]);

    return (<div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Memoization Example</h1>
      <p className="text-lg">Count: {count}</p>
      <p className="text-lg">Memoized Value: {memoizedValue}</p>
        <button onClick={() => setCount(count + 1)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Increment Count
        </button>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="check prime number" 
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={() => setCount(Number(text))} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Check Prime
        </button>
    </div>);
}

export default Memo;

