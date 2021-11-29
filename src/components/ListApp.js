import React from 'react';

const ItemDefault = ({item}) => {
  return <p>{item.text}</p>
}

function ListApp({items, children, itemComponent}) {
  if(!items || !Array.isArray(items)) {
    return null;
  }

  const childrenWithProps = (itemProp) => React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { item: itemProp });
    }
    return child;
  });

  const Item = itemComponent || ItemDefault;
  return (
    <ul>
      {
        items.length > 0 && items.map(item => (
          <Item item={item}/>
        ))
      }
      {/*{*/}
      {/*  items.length > 0 && items.map(item => (*/}
      {/*    children*/}
      {/*  ))*/}
      {/*}*/}
      {
        items.length > 0 && items.map(item => (
          childrenWithProps(item)
        ))
      }
    </ul>
  );
}

export default ListApp;
