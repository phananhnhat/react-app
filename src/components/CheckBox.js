import React from 'react';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    }
  }

  handleOnChangeAuthorizedIndustry = (e, data) => {
    // Nếu dùng checked={this.state.checked} thì checked ở 2 tráng thái checked phía dưới console ra sẽ khác nhau.
    // Do sau khi setTimeout thì dù đã check thay đổi checkbox nhưng ko setState nên react vẫn để trạng thái cũ.
    // Log ra ở trong setTimeout thì lúc đó trạng thái trên dom vẫn là cái cũ
    // Nếu thay checked bằng defaultCheked thì kết quả 2 lần log mới giống nhau do react ko can thiệp nên dom có thể tự thay đổi theo ý mình
    // Dùng defaultCheked thì lại ko điều khiển được value theo state của các lần render sau, chỉ đc mỗi làn mount

    console.log(e.target.checked);
    // e.persist();
    // React 16. Phải dùng e.persist() thì mới lấy đc e.target, nếu ko sẽ e.target bằng null
    // React 17 thì ko cần nữa.
    setTimeout(() => {
      console.log(e.target.checked); // Works
    }, 100);
  }

  render() {
    return (
      <div>
        <input
          id="xxx"
          type="checkbox"
          checked={this.state.checked}
          value="checkboxValue"
          onChange={e => this.handleOnChangeAuthorizedIndustry(e, {x: 1})}
        />
        123
      </div>
    )
  }
}

export default App;
