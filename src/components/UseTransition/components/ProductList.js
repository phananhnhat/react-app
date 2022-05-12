import React, { useDeferredValue, useMemo } from 'react';
import {generateProducts} from '../data';

export const dummyProducts = generateProducts();

let k = 0;

// TODO Xét trong ví dụ này
//  Vấn đề giật lag vẫn không được giải quyết như ví dụ của UseDeferredValue, mặc dù số lượng element render ra là như nhau
//  Nguyên nhân ko phải do sử dụng sai cách mà là do việc render trong ví dụ này rất tốn tài nguyên hơn so với trong ví dụ của UseDeferredValue
//  filterProducts ở các giá trị filterTerm là '1' '12' '123' '1234' thì số lượng element thay đổi rất lớn.
//  React sẽ phải xóa bỏ hoặc tạo mới component <li> rất nhiều lần, tạo mới/ update tốn nhiều tài nguyên hơn so với việc chỉ update trong ví dụ của UseDeferredValue
//  Trong Ex 1 và Ex 2 giả dụ số lượng thay đổi ít thì UI ko xảy ra hiện tượng bị giật nữa.

function filterProducts(filterTerm) {
  // Ex 1.
  // k++;
  // console.log('kkk', k)
  // return dummyProducts.slice(k, 9000)

  // Ex 2.
  if (filterTerm[filterTerm.length - 1] === 'x') {
    return dummyProducts;
  }
  if (!filterTerm) {
    return [];
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));

  // if (!filterTerm) {
  //   return dummyProducts;
  // }
  //
  // return dummyProducts.filter((product) => product.includes(filterTerm));
}

const Bbb = ({list, value}) => {
  return <ul>
    {
      list.map((a) => (
        <li>{a} - {value}</li>
      ))
    }
  </ul>;
}

// function ProductList({ filterTerm }) {
//   // const deferredProducts = useDeferredValue(products);
//   const deferredFilterTerm = useDeferredValue(filterTerm);
//
//   console.log(deferredFilterTerm, filterTerm)
//
//   // const products = filterProducts(filterTerm);
//
//   const suggestions = useMemo(() => {
//     const list = filterProducts(deferredFilterTerm);
//     return <Bbb list={list} value={list.length}  />
//   }, [deferredFilterTerm])
//
//   return suggestions;
// }

function ProductList({ products }) {
  // const deferredProducts = useDeferredValue(products);
  // TODO: Khi dùng useDeferredValue thì nên sử dụng với memo để tối ưu thêm

  return (
    <ul>
      {products.map((product) => (
        <li>{product}</li>
      ))}
    </ul>
  );
}

export default ProductList;
