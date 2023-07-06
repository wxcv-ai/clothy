import React, { useEffect , useState} from 'react';
import ItemForFeatures from './ItemForFeatures';
import { connect, useDispatch } from 'react-redux';
import {  ADD_WISH, addCompare } from '../actions';

function FeaturesItem({  items, addCompare }) {
  var one_data = {
    "price": 42,
    "name": "MEASURING CUP COD",
    "id": 0,
    "check": false,
    "recommend": false,
    "quantity": 1,
    "webId": 422451,
    "category": "features-item",
    "sold": 74,
    "date": "2019-07-19 06:21:39",
    "condition": true,
    "brand": "E-SHOPPER",
    "imgSrc": "https://cf.shopee.ph/file/30e24461beb4acf16a4efa957ca70218",
    "detail": [
        {
            "imgSrc": "https://cf.shopee.ph/file/075ecc0ba4f9e1a4b0db632a1245acb3"
        },
        {



          "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHryx9d2zTw1GMmzcalC2VZKaSy23EsFobkw&usqp=CAU"
        },
        {
            "imgSrc": "https://cf.shopee.ph/file/a8fb772bf712af9088811bab6bcb53a1"
        }
    ] ,
    "other_detail": [
      {
          "red": {44:100 ,41:2 , 39:2}
      },
      {
          "green": {44:23 ,41:0 , 39:212}
      },
      {
          "yellow": {44:3 ,41:2520 , 39:0}
      }
  ] ,
  "other_detail_Quantity": [
    {
        "red": 122
    },
    {
        "green": 15
    },
    {
        "yellow": 0 
    }
]

  }

  var all_items = [
    one_data , one_data , one_data ,one_data , one_data , one_data ,one_data , one_data , one_data ,
    one_data , one_data , one_data ,one_data , one_data , one_data ,one_data , one_data , one_data ,
    one_data , one_data , one_data ,one_data , one_data , one_data ,one_data , one_data , one_data 
  ]
  items = all_items ; 

  const item_per_page = 12 ;
  const [integer , Setinteger] = useState(1) ;
  const [index_page , Setindex_page] = useState(1) ;
  
  const declineFunc = (()=> {
    if (!(integer-item_per_page <= 1)) {
      Setinteger(integer-item_per_page) ;
      Setindex_page(index_page-1) ;
    }
    else {Setinteger(1);
      Setindex_page(1) ;
    }
  })

  const AddFunc = (()=> {
    if ((integer > items.length-item_per_page)) {}
    else {Setinteger(integer+item_per_page) ;
      Setindex_page(index_page+1) ;
    }    
  })

  

  const dispatch = useDispatch();

  const dispatchToState = (item, webId) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
      webId: webId,
      quantity: 1,
    });
  };


  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <div className="row1 row">
          {items.slice(integer-1,integer-1+12).map((item, i) => {
            return (
              <ItemForFeatures
                key={i}
                item={item}
                title={item.name}
                webId={item.webId}
                id={item.id}
                imgSrc={item.imgSrc}
                price={item.price}
                other_detail = {item.other_detail}
                dispatchToState={() => dispatchToState(item, item.webId)}
                dispatchToWish={() =>
                  dispatch({ type: ADD_WISH, payload: item, webId: item.webId })
                }
                dispatchToCompare={() => addCompare(item, item.webId, i)}
                recommend={item.recommend}
                date={item.date}
                condition={item.condition}
                check={item.check}
              />
            );
          })}
        </div>

        <div className='numeratation'>
          <div className='item_modf' onClick={(e)=>{ declineFunc() ;}}>{"<"}</div>
          <div className='Number'>{index_page}</div>
          <div className='item_modf' onClick={(e)=>{ AddFunc() ;}}>{">"}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { items: state.fetchItems.featuresItems };
};

export default connect(mapStateToProps, {  addCompare })(
  FeaturesItem
);
