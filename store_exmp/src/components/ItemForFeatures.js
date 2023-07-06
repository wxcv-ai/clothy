import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';

function ItemForFeatures({
  title,
  item,
  price,
  imgSrc,
  date,
  webId,
  id,
  dispatchToState,
  dispatchToWish,
  dispatchToCompare,
  recommend,
  condition,
  other_detail , 
}) {
  const success = (name, value) => {
    message.success(`'${name}' ${value}`);
  };

  const error = (name, value) => {
    message.error(`'${name}' ${value}`);
  };

  const warning = (value) => {
    message.warning(`${value}`);
  };

  let combineButton = () => {
    success(title, 'has been added to the cart');
    dispatchToState();
  };



  return (
    <div className="col-sm-4 col-xs-6" style={{ marginLeft: '-10px' }}>
      <div className="product-image-wrapper p-i-w">
        <div className="single-products">
          <div className="productinfo text-center">
           
            <Link
              to={{ pathname: `/item/${id}`, state: { renderedItem: item } }} 
              >
              <img src={imgSrc} alt="" />
            </Link>

            <h2>{price} kr</h2>
            <p>{title}</p>
            




            <button
              onClick={() => combineButton()}
              className="btn btn-default add-to-cart"
            >
              <i className="fa fa-shopping-cart"></i>Add to cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ItemForFeatures;
