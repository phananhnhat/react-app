import React, { useState, useMemo, useDeferredValue, Suspense } from "react";
import { Grid } from "./Grid";

// TODO useDeferredValue ko phải là hạn chế số lần render của 1 componet vì vốn dũ việc tính toán của vòng lặp vẽ ra Grid ko quá nhiều, 1 lần tầm 40ms
//  Mà là để hạn chế số lần React vẽ lại DOM, do mức độ ưu tiến sẽ thấp hơn

export default function App(props) {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value);
  // console.log('deferredValue', deferredValue, value);

  // console.log('render', value)

  const suggestions = useMemo(() => {
    // console.log('memo')
      return <Grid value={deferredValue} />;
    }
      ,
    [deferredValue]
  );

  const keyPressHandler = (e) => {
    // console.log('keyPressHandler');
    setValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input onKeyUp={keyPressHandler} />

      {/*<Grid value={value} />*/}

      {/*<Grid value={deferredValue} />*/}

      {suggestions}
    </div>
  );
}
