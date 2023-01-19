// Để kiểm tra hàm này, chúng ta có thể sử dụng hàm giả và kiểm tra trạng thái của hàm giả để đảm bảo cuộc gọi lại được gọi như mong đợi.
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
