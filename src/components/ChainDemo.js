import React, { useState, useCallback, useMemo } from 'react';

const App = () => {
  return (
    <div
      style={{
        backgroundColor: '#000',
        height: 400,
      }}
    >
      <Chain />
    </div>
  )
}

const Chain = () => {
  const [items, setItems] = useState(['A', 'B', 'C']);

  const addItem = (index) => {
    // const newItems = [...items];
    // newItems.splice(index + 1, 0, '')
    // setItems(newItems);
    setItems((old) => {
      const new1 = [...old];
      new1.splice(index + 1, 0, '')
      return new1;
    });
  };

  const changeItemValue = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((item, index) => {
        return <Item value={item} onAdd={() => addItem(index)} onChange={(value) => changeItemValue(index, value)} />
      })}
      <div
        style={{
          color: '#FFF',
          fontSize: '40px',
        }}
      >
        {items.join('')}
      </div>
    </div>
  )
};

const Item = (props) => {
  const onChange = (e) => {
    const v = e.target.value;
    props.onChange(v.length > 1 ? v[0] : v);
  }

  return (
    <div style={{
      border: '3px solid #FFF',
      borderRadius: 25,
      padding: 50,
      position: 'relative',
    }}>
      <input
        style={{
          border: '3px dotted #AAAAAA',
          width: 40,
          height: 40,
          color: '#FFF',
          backgroundColor: '#000',
          fontSize: '40px',
        }}
        onChange={onChange}
        value={props.value}
      />
      <div
        style={{
          width: 20,
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: -10,
          cursor: 'pointer',
          zIndex: '1',
        }}
        onClick={props.onAdd}
      />
    </div>
  )
}

export default App;
