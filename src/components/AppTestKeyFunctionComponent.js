import React, {useEffect, useRef, useState} from 'react';

// const Item = (props) => {
//   const a = useRef();
//   useEffect(() => {
//     a.current.classList.add('class' + props.data.name)
//     console.log('Item mount');
//     return () => {
//       console.log('Item unmount');
//     }
//   }, [])
//
//   return (
//     <div ref={a}> {props.data.name} </div>
//   )
// }
//
// const ListApp = () => {
//   const [items, setItems] = useState(
//     [
//       {id: 1, name: 'A'},
//       {id: 2, name: 'B'},
//       {id: 3, name: 'C'},
//       {id: 4, name: 'D'},
//       {id: 5, name: 'E'},
//       {id: 6, name: 'F'},
//       {id: 7, name: 'G'},
//     // {id: '4', name: 'D'},
//     // {id: '5', name: 'E'},
//     ]
//   )
//
//   const onClick = () => {
//     items.shift();
//     const a = [
//       ...items,
//     ]
//     setItems(a);
//   }
//
//
//   return (
//     <div>
//       {
//         items.map((item, index) => <Item key={item.id} data={item} />)
//       }
//       <button onClick={onClick}>BTN</button>
//     </div>
//   )
// }

const Item = ({bodyItem, data}) => {
  useEffect(() => {
    console.log('Item mount');
    return () => {
      console.log('Item unmount');
    }
  }, [])

  return (
    <span style={{background: 'red'}} > {data[bodyItem.name]} </span>
  )
}

const Item1 = ({bodyItem, data}) => {
  useEffect(() => {
    console.log('Item1 mount');
    return () => {
      console.log('Item1 unmount');
    }
  }, [])

  return (
    <span style={{background: 'blue'}} > {data[bodyItem.name]} </span>
  )
}

const Row = (props) => {
  return (
    <div>
      {
        props.columns.map((item, index) => {
          if(item.name === 'name') {
            return <Item1 key={index} bodyItem={item} data={props.data} />;
          }
          return <Item key={index} bodyItem={item} data={props.data} />;
        })
      }
    </div>
  )
}

const ListApp = () => {
  const [items, setItems] = useState(
    [
      {id: 1, name: 'A', value: 'Value A1'},
      // {id: 2, name: 'B', value: 'Value B'},
      // {id: 3, name: 'C', value: 'Value C'},
      // {id: 4, name: 'D', value: 'Value D'},
      // {id: 5, name: 'E', value: 'Value E'},
      // {id: 6, name: 'F', value: 'Value F'},
      // {id: 7, name: 'G', value: 'Value G'},
    ]
  )

  const [columns, setColumns] = useState(
    [
      {name: 'name'},
      {name: 'value'},
      {name: 'name'},
      {name: 'name'},
      {name: 'name'},
      {name: 'name'},
      {name: 'name'},
      {name: 'name'},
    ]
  )

  const onClick = () => {
    items.shift();
    const a = [
      ...items,
    ]
    setItems(a);
  }

  const onClick1 = () => {
    // TODO by NhatPA: Khi x??a 1 c???t, c??c key ??ang l???y theo index.
    // Th?? n???u kh??c c??c Component s??? d???ng (Item ho???c Item1) th?? s??? b??? unmout ... :( M??i m???i nh??n th???y :(
    // C??n n???u v???n gi??? nguy??n Component ???ng v???i b??? tr?? th?? ch??? update m?? th??i
    columns.shift();
    const a = [
      ...columns,
    ]
    setColumns(a);
  }


  return (
    <div>
      {
        items.map((item, index) => <Row key={index} data={item} columns={columns} />)
      }
      <button onClick={onClick}>BTN</button>
      <button onClick={onClick1}>BTN</button>
    </div>
  )
}

export default ListApp;
