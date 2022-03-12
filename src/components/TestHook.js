import React, {useEffect, useState} from "react";
import styles from './Counter.module.css';

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 3000);
});

export default function TestHook() {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  useEffect(() => {
    console.log(y);
    if (x === 10) setX(1);
  }, [x],);

  useEffect(() => {
    myPromise
      .then(() => {
        console.log('x Promise: ', x);
      });
  }, [],);

  // useEffect(() => {
  //     console.log(x);
  //   },
  //   [],
  // );

  const onClick = () => {
    setX(x + 1);
  };

  const onClick1 = () => {
    setY(y + 1);
  };

  return (<div>
    <button
      className={styles.button}
      aria-label="Increment value"
      onClick={onClick}
    >
      +
    </button>
    <button
      className={styles.button}
      aria-label="Increment value"
      onClick={onClick1}
    >
      -
    </button>
    <p>{x}</p>
    <p>{y}</p>
  </div>);
}
