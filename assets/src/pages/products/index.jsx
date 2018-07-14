import React from 'react';
import { connect } from 'dva';
import ProductList from 'components/productList';
import "./index.less";

const Products = ({ dispatch, products }) => {

  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <img className="test" src={`${imgSrc}/img/yay.jpg`} alt=""/>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);