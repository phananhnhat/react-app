import React, { useState, useMemo, useDeferredValue, Suspense } from "react";
import { Grid } from "./Grid";

// TODO useDeferredValue ko phải là hạn chế số lần render của 1 componet vì vốn dũ việc tính toán của vòng lặp vẽ ra Grid ko quá nhiều, 1 lần tầm 40ms
//  Mà là để hạn chế số lần React vẽ lại DOM, do mức độ ưu tiến sẽ thấp hơn
//  Kết luận trên là SAI, nguyên nhân là ấn phím chưa đủ nhanh nên ko quan sát được.
//  Nguyên tắc rất đơn giản: Khi ấn phím cực nhanh thì useDeferredValue vẫn trả về giá trị value cũ, khi dùng với useMemo thì vẫn là instance cũ.
//  Mà instance thì sẽ ko khiến cho component bị render lại (quan trọng)
//  Nên cuối cùng số lần render của Grid sẽ được loại bỏ bớt nếu ko cần thiết.
//  Hãy để 4 ngón lên 4 phím, ấn thật nhanh, deferredValue sẽ chỉ thay đổi duy nhất 1 lần => render 1 lần mà thôi

let xxx = null;

let n = 0;

export default function App(props) {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value);
  // console.log('deferredValue', deferredValue, value);

  const suggestions = useMemo(() => {
      console.log('memo')
      return <Grid value={deferredValue} />;
    },
    [deferredValue]
  );
  // console.log(xxx === suggestions);
  // xxx = suggestions;

  const keyPressHandler = (e) => {
    console.log('keyPressHandler');

    // Test băng tay
    setValue(e.target.value);

    // Test bằng tự động
    // const myInterval = setInterval(() => {
    //   n ++;
    //   if(n === 50) {
    //     clearInterval(myInterval);
    //   }
    //   console.log('setInterval')
    //   setValue((x) => x + '1')
    // }, 30);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input onChange={keyPressHandler} value={value} />

      {/*<Grid value={value} />*/}

      {/*<Grid value={deferredValue} />*/}

      {suggestions}
    </div>
  );
}
