import React, { useState, useTransition, Suspense, useEffect } from "react";
import styles from './Counter.module.css';

const fetchAfterMillisecond = async (data, number) => {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + ':' + number);
    }, number);
  });
  return myPromise;
}

export default function TestHook() {
  const [x, setX] = useState(10);

  useEffect(() => {
    // debugger;
  }, []);

  const handleAdd = () => {
    setX((prevX) => {
      return prevX + 1;
    });
  };

  const handleMinus = () => {
    setX(x - 1);
  };

  return (<div>
    <button
      className={styles.button}
      aria-label="Increment value"
      onClick={handleAdd}
    >
      +
    </button>
    {x}
    <button
      className={styles.button}
      aria-label="Increment value"
      onClick={handleMinus}
    >
      -
    </button>
  </div>);
}
