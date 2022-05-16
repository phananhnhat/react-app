import React, { useState, useMemo, useDeferredValue } from "react";
import { Grid } from "./Grid";

// TODO useDeferredValue ko phải là hạn chế số lần render của 1 componet vì vốn dũ việc tính toán của vòng lặp vẽ ra Grid ko quá nhiều, 1 lần tầm 40ms
//  Mà là để hạn chế số lần React vẽ lại DOM, do mức độ ưu tiến sẽ thấp hơn
//  Kết luận trên là SAI, nguyên nhân là ấn phím chưa đủ nhanh nên ko quan sát được.
//  Nguyên tắc rất đơn giản: Khi ấn phím cực nhanh thì useDeferredValue vẫn trả về giá trị value cũ, khi dùng với useMemo thì vẫn là instance cũ.
//  Mà instance thì sẽ ko khiến cho component bị render lại (quan trọng)
//  Nên cuối cùng số lần render của Grid sẽ được loại bỏ bớt nếu ko cần thiết.
//  Hãy để 4 ngón lên 4 phím, ấn thật nhanh, deferredValue sẽ chỉ thay đổi duy nhất 1 lần => render 1 lần mà thôi

// TODO Cách dùng:
//  useDeferredValue tương tự như startTransition nhưng với một API tương tự như trình trợ giúp useDebouncedValue
//  Nó hữu ích khi giá trị đến "từ bên trên" và bạn thực sự không có quyền kiểm soát lệnh gọi setState tương ứng
//  Nó ít rắc rối hơn để sử dụng so với startTransition nhưng nó có những cạm bẫy tương tự như userland useDebouncedValue
//  (ví dụ: bạn phải sử dụng memoization cho các thành phần con để nhận được bất kỳ lợi ích nào và bạn cần thận trọng để không chuyển các giá trị luôn mới vào nó để tránh lặp lại ).

// TODO Sự khác biệt là useTransition()bao bọc mã cập nhật trạng thái, trong khi useDeferredValue()bao bọc một giá trị bị ảnh hưởng bởi cập nhật trạng thái.
//  Bạn không cần (và không nên) sử dụng cả hai cùng nhau, vì cuối cùng thì chúng cũng đạt được cùng một mục tiêu.
//  Thay vào đó, bạn nên useTransition(), nếu bạn có một số cập nhật trạng thái cần được xử lý với mức độ ưu tiên thấp hơn và
//  bạn có quyền truy cập vào mã cập nhật trạng thái. Nếu bạn không có quyền truy cập đó, hãy sử dụng useDeferredValue().

// https://viblo.asia/p/concurrent-mode-trong-react-4dbZN29LZYM

let xxx = null;

let n = 0;

export default function App(props) {
  const [value, setValue] = useState("");

  const deferredValue = useDeferredValue(value);
  // console.log('deferredValue', deferredValue, value);

  // TODO: Ko dùng useMemo thì dùng React.memo với Grid thì cũng đạt hiệu quả như nhau
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
