import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';

const usePrevCount = (count) => {
  const prevCount = useRef(null);
  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return prevCount.current;
}

const useGetApi = (url, params) => {
  const [status, setStatus] = useState('loading');
  const [response, setResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  useEffect(() => {
    axios(({
      method: 'GET',
      url,
      params,
    })).then((response) => {
      setIsSuccess(true);
      setResponse(response);
    }).catch((error) => {
      setResponse(error);
    }).finally(() => {
      setStatus('done');
    });
  }, []);

  return {
    status,
    response,
    isSuccess,
  }
}

const CheckInNotReflectWorksDialog = () => {
  const [count, setCount] = useState(0);
  const preCount = usePrevCount(count);
  const {
    status,
    response,
    isSuccess,
  } = useGetApi('https://dog.ceo/api/breed/hound/images/random/10')

  const pre = () => {
    setCount(count - 1);
  }

  const add = () => {
    setCount(count + 1);
  }

  console.log({
    status,
    response,
    isSuccess,
  });

  return (
    <div>
      <button onClick={pre}>Giam</button>
      {count} - {preCount}
      <button onClick={add}>Tang</button>

      <div>{status}</div>
      {
        status === 'done' ? (
          <div>{isSuccess ? 'SUCCESS' : 'ERROR'}</div>
        ) : null
      }
      {
        status === 'done' && isSuccess ? (
          <ul>
            {
              response.data.message.map((item) => {
                return <li>{item}</li>;
              })
            }
          </ul>
        ) : null
      }
    </div>
  )
}

// const CheckInNotReflectWorksDialog = () => {
//   const [count, setCount] = useState(0);
//   const [y, setY] = useState(0);
//   useEffect(() => {
//     console.log('NhatPA1 useEffect', count)
//     setY(y + 1)
//   }, [count]);
//
//   const pre = () => {
//     setCount(count - 1);
//   }
//
//   const add = () => {
//     setCount(count + 1);
//   }
//
//   return (
//     <div>
//       <button onClick={pre}>Giam</button>
//       {count} - {y}
//       <button onClick={add}>Tang</button>
//     </div>
//   )
// }



export default CheckInNotReflectWorksDialog;
