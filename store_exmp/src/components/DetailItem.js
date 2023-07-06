import React, { useState, useEffect } from 'react';
import { ADD_ITEM } from '../actions';
import { useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { message } from 'antd';

function DetailItem({ props }) {

  const [value, setValue] = useState(1);
  const [clickedImage, setClickedImage] = useState(false);
  const [imageClick, setImageClick] = useState('');
  const [index, setIndex] = useState(null);
  const [sizes_bool, Setsizes_bool] = useState(false);
  const [sizes, Setsizes] = useState({});
  const [thecolor_chosing , Setthecolor_chosing ]= useState('') ;
  const [Size_choice , SetSize_choice ]= useState('') ;
  const [SizeQuantity , SetSizeQuantity ]= useState('') ;
  const [ColorQuantity , SetColorQuantity ]= useState(1) ;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  const dispatchToState = (item, webId, quantity, color ,size) => {
    dispatch({
      type: ADD_ITEM,
      payload: item,
      webId: item["id"].toString()+color.toString()+size.toString(),
      quantity: quantity,
      color : color ,
      size : size ,
      
    });
    succes('has been added to the cart');
  };

  const succes = (value) => {
    message
      .loading('Action in progress..', 1.5)
      .then(() => message.success(`"${props.name}" ${value}`, 1));
  };
  const error = (name, value) => {
    message.error(`'${name}' ${value}`);
  };

  const changeImageClick = (img, i) => {
    if (index === i) {
      setClickedImage(false);
    } else {
      setClickedImage(true);
      setImageClick(img);
      setIndex(i);
    }
  };

  const showItems = props.detail.map((img, i) => {
    return (
      <div key={i}>
        <img
          className="mini-carousel-img"
          alt={img.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          src={i === index ? props.imgSrc : img.imgSrc}
          onClick={() => changeImageClick(img.imgSrc, i)}
        />
      </div>
    );
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
  };

  const ChooseColorDetail = ((data , color)=>{
    var sizes_array = data[color] ;
    Setthecolor_chosing(color);
    Setsizes(sizes_array) ; 
    return sizes_array ; 
  })

  const detailed_item_choice = ((props,color,size)=>{

 
    
    var temp_props = props ;
    temp_props["color_choice" ] =color ;
    temp_props["size_choice" ] =size ;
    temp_props["webId" ]=temp_props["id" ].toString()+color.toString()+size.toString()
    SetSize_choice("");
    Setthecolor_chosing("");       
    return temp_props ;


    

  })
  const AddToCart = (()=>{
    var data = props.other_detail[0]
    var color = Object.keys(props.other_detail[0])[0]  
    var all_sizes =  Object.keys(data[color]) ;  
    var all_colors = Object.keys(props.other_detail)

    if (all_colors.length >0 && ColorQuantity == 0  ) {
      error("this color is  no longer available" ,"")
    }
    else if (all_colors.length >0 && thecolor_chosing.length ==0  ) {
      error("make sure to select a color " ,"")
    }
    else if (all_sizes.length >0 && Size_choice.length ==0  ) {
      error("make sure to select a size " ,"")
    }
    else if (all_sizes.length >0 && SizeQuantity == 0  ) {
      error("this size is  no longer available" ,"")
    }

    else {
      dispatchToState(detailed_item_choice(props,thecolor_chosing,Size_choice),
      (props.webId) , 
      Number(value) ,
      thecolor_chosing , 
      Size_choice)      
    }


  })
  return (
    <div className="col-sm-9 padding-right">
      <div className="product-details">
        <div className="col-sm-5" style={{ textAlign: 'center' }}>
          <div className="view-product">
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={clickedImage ? imageClick : props.imgSrc}
                  alt={props.name}
                />
              </TransformComponent>
            </TransformWrapper>
            <h3>Zoom</h3>
          </div>
          <Carousel
            ssr
            swipeable={false}
            draggable={false}
            partialVisbile
            itemClass="image-item"
            responsive={responsive}
          >
            {showItems}
          </Carousel>
        </div>
        <div className="col-sm-7">
          <div className="product-information">
            <img
              src="images/product-details/new.jpg"
              className="newarrival"
              alt=""
            />
            <h2>{props.name}</h2>
            <p>Web ID: {props.webId}</p>
            <img src="images/product-details/rating.png" alt="" />
            <span>
              <span>{props.price} kr</span>
              <label>Quantity:</label>
              <input
                onChange={(e) => setValue(e.target.value.replace(/\D/, ''))}
                value={value}
                maxLength="2"
                min="0"
                max="60"
              />
              <button
                type="button"
                className="btn btn-fefault cart"
                onClick={() =>{AddToCart();}}
              >
                <i className="fa fa-shopping-cart"></i>&nbsp; Add to cart
              </button>
            </span>
            <p>
              <b>Availability:</b> In Stock
            </p>
            <p>
              <b>Category:</b> {props.category}
            </p>
            <p>
              <b>Brand:</b> {props.brand}
            </p>
            <a href="/#">
              <img
                src="images/product-details/share.png"
                className="share img-responsive"
                alt=""
              />
            </a>
            <div className='color_size'>
              { 
                ((Object.keys(props.other_detail))).map( 
                  (color_id,i)=>(
                      <div className='color_size_total'>
                        
                        <div className='color'  
                        
                          style={{color: props.other_detail_Quantity[color_id][Object.keys(props.other_detail[color_id])[0]] > 0 ? 'black' : 'grey',}}
                          onClick={(e)=>{
                          ChooseColorDetail(props.other_detail[color_id]   , Object.keys(props.other_detail[color_id])[0]   ) 
                          Setsizes_bool(true) ;
                          SetColorQuantity (( props.other_detail_Quantity[color_id][Object.keys(props.other_detail[color_id])[0]] ) ) ;
                          // <div className='sizes'> {sizes[key]}</div>
                          }}>
                          {Object.keys(props.other_detail[color_id])[0]}
                        </div>
                          

  
                      

                      <div className='final_sizes'>
                      { (sizes_bool && Object.keys(props.other_detail[color_id])[0] == thecolor_chosing)
                        && ( Object.keys(sizes).map((key,idx)=>(
                          <div className='all_sizes'> 
                            {(sizes[key] > 0 ) && (<div className='sizes' style={{ color:'black' }} onClick={(e)=>{
                              SetSize_choice(Object.keys(sizes)[idx])
                              SetSizeQuantity(sizes[Object.keys(sizes)[idx]]) ;

                              }}> {Object.keys(sizes)[idx]} </div>)}


                            {(sizes[key] <= 0 ) && (<div className='sizes' style={{ color:'grey' }} onClick={(e)=>{
                              SetSize_choice(Object.keys(sizes)[idx]) ;
                              SetSizeQuantity(sizes[Object.keys(sizes)[idx]]) ;
                              
                              }}>  {Object.keys(sizes)[idx]} </div>)}
                          </div>

                        )))}
                      </div>


                      </div>

                      )
              ) 
              }


            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailItem;
