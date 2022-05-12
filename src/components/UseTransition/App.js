import { useState, useTransition } from 'react';
import ProductList, {dummyProducts} from './components/ProductList';

// TODO Source gốc: https://github.com/academind/react-18-concurrency-first-look/tree/02-finished
// Video: https://www.youtube.com/watch?v=lDukIAymutM&ab_channel=Academind
// => Cũng basic thôi, ko có gì cao siêu.

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');

  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    startTransition(() => {
      setFilterTerm(event.target.value);
    });
    // setFilterTerm(event.target.value);
  }

  return (
    <div id="app">
      <input type="text" onChange={updateFilterHandler} />
      <p style={{color: 'white'}}>{isPending ? 'Updating List...' : '.........'}</p>
      <ProductList
        products={filteredProducts}
        filterTerm={filterTerm}
      />
    </div>
  );
}

export default App;
