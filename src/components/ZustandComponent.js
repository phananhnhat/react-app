import React, {useEffect, useState} from 'react';
import {stateFromHTML} from 'draft-js-import-html';

import {useBearStore} from '../zustand/store';

// TODO
//  So sánh zustand và redux
//  * Store: Zustand phân ra nhiều store, con redux là 1 store chữa toàn bộ state
//  * Store - Selector: Zustand phân ra nhiều store nên mỗi store là có các selector vào store, còn trong redux các selector là lấy data từ 1 object state duy nhất.
//  * Reducer: Zustand không có reducer, việc thay đổi data chỉ là khai báo 1 funtion trong state và gọi nó trong component, còn với redux thì reducer và data là tách riêng.
//    Nếu trong redux-toolkit thì có thể tạo reducer và định nghĩa data trong 1 nơi (createSlice)
//  * Dispatch - Action: Zustand không có reducer, nên không có dispatch và action, muốn thay đổi state, đó chỉ đơn giản là gọi 1 function khai báo trong state
//    Redux thì dispatch 1 action bất kì và trong reducer sẽ bắt action này và tính toán state mới
//  * Redux-saga: Hỗ trợ TypeScript kém so với Zustand

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

export default () => {
  return (
    <div>
      <BearCounter />
      <Controls />
    </div>
  );
}
