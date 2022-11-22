import React, { useState, useMemo, useTransition } from "react";
import { Grid } from "../UseDeferredValue/Grid";

// TODO Ví dụ này thì memo vẫn chưa nhận biết rõ.
//  Cần xem thêm: https://codesandbox.io/s/serverless-fast-isjkvt?file=/src/index.js
//  useTransition có vẻ như là hay dùng với Suspense
//  useTransition thì sẽ có 1 cơ chế đặc biệt là component được render lại rồi nhưng cái trên dom vẫn là bản sao cũ trước đó chứ chưa phải update mới nhất

// TODO: 12/5/2022
//  Xem ví dụ trong file ./App.js

// Tiến trình render sẽ không chặn luồng nữa, nó sẽ tiếp diễn và có thể đẩy gì đó vào nếu nó có độ ưu tiên cao hơn, ví dụ như là user ấn một nút gì đó trên bàn phím chẳng hạn.
// Có thể hiểu là lúc setState sẽ chờ 1 khoảng thời gian nhỏ, nếu có 1 lần render nào đấy có độ ưu tiên cao hơn thì sẽ chạy cái đó trước.

// TODO Sự khác biệt là useTransition()bao bọc mã cập nhật trạng thái, trong khi useDeferredValue()bao bọc một giá trị bị ảnh hưởng bởi cập nhật trạng thái.
//  Bạn không cần (và không nên) sử dụng cả hai cùng nhau, vì cuối cùng thì chúng cũng đạt được cùng một mục tiêu.
//  Thay vào đó, bạn nên useTransition(), nếu bạn có một số cập nhật trạng thái cần được xử lý với mức độ ưu tiên thấp hơn và
//  bạn có quyền truy cập vào mã cập nhật trạng thái. Nếu bạn không có quyền truy cập đó, hãy sử dụng useDeferredValue().

export default function App(props) {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // console.log(count);
  const suggestions = useMemo(() => {
      console.log('memo')
      return <Grid value={count} />;
    },
    [count]
  );

  const keyPressHandler = (e) => {
    // console.log('keyPressHandler');

    // Test băng tay
    setValue(e.target.value);
    startTransition(() => {
      // setCount((c) => {
      //   console.log('setCount')
      //   return c + 1;
      // });
      setCount(count + 1)
    });

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

  const handleClick = () => {
    setCount((c) => c + 1);
  };

  return (
    <div className="App">
      <h1>{props.caption}</h1>
      <input onChange={keyPressHandler} value={value} />
      <button onClick={handleClick}>Click ! {count}</button>

      <p>
        {isPending ? " Loading..." : 'Success'}
      </p>

      {/*<Grid value={value} />*/}

      {/*<Grid value={deferredValue} />*/}

      {suggestions}
    </div>
  );
}
