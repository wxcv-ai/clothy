import React, { useEffect , useReducer, useState} from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

function Cart() {

  const [CheckState,SetCheckState] = useState(false) ;
  const [total_price,Settotal_price] = useState(0) ;
  var Shipment_price = 7 ;
  const state = useSelector((state) => state.cartReducer);
  //console.log(state , "state")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total_price_func  = (()=>{
      var the_tot_price  = 0 ;
      state.map((item, i) => {
        Settotal_price(total_price+item.price) ;
        the_tot_price = the_tot_price + (item.price*item.quantity) ; 

      })

      Settotal_price(the_tot_price) ; 
      the_tot_price = 0 ;
  })
  useEffect (()=>{
    //Settotal_price(0) ;
    total_price_func() ;

  } , [state])

  const showItems =
    state && state.length > 0 ? (
      state.map((item, i) => {
        return (
          <CartItem
            id={i}
            imgSrc={item.imgSrc}
            title={item.name}
            webId={item.webId}
            price={item.price}
            quantity={item.quantity}
            color={item.color_choice}
            size={item.size_choice}
            
          />
        );
      })
    ) : (
      <div
        className={state.length > 0 ? '' : 'mb-44r'}
        style={{ padding: '2rem' }}
      >
        NO ITEMS IN CART
      </div>
    );

  return (
   
    <div className="container">
       
       {(CheckState)&& (
      <div className="maincontainer">
      <div className='cancel_btn_det'> 
          <button class="btn btn-primary btn-lg btn-block" type="button" style ={{width:"10%" , height:"40px" ,backgroundColor:"red" }}
          onClick={(e)=> {SetCheckState(false)}}
          >X</button>      
      </div>

  
      <div class="container">
  
        <div class="row">
  
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Billing address</h4>
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName">First name</label>
                  <input type="text" class="form-control" id="firstName" placeholder="" value="" required />
            
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">Last name</label>
                  <input type="text" class="form-control" id="lastName" placeholder="" value="" required />
            
                </div>
              </div>
              <div class="mb-3">
                <label for="username">Phone Number</label>
                    <input type="text" class="form-control" id="address2" placeholder="Phone Number" />
              </div>
              <div class="mb-3">
                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com" />
        
              </div>
  
  
  
              <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
          
              </div>
  
  
  
  
              <div class="mb-3">
                <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
              </div>
  
  
              <div class="mb-3">
                <label for="address2">Zip code</label>
                  <input type="text" class="form-control" id="address2" placeholder="Zip code" />
              </div>
  
              <div class="row">
                <div class="col-md-5 mb-3">
                  <label for="country">Country</label>
                  <select class="custom-select d-block w-100" id="country" required>
                    <option value="">Choose...</option>
                    <option>Tunisia</option>
                  </select>
            
                </div>
  
  
              </div>
  
  
              <div class="mb-3">
                <label for="address">State</label>
                <input type="text" class="form-control" id="address" placeholder="State" required />
          
              </div>
  
              <h4 class="Payment_tag">Shipment</h4>
              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input id="credit2" name="paymentMethod2" type="radio" class="custom-control-input2" checked required />
                  <label class="custom-control-label2" for="credit2"> shipment to front home {Shipment_price} TND</label>
                </div>
              </div>


              <h4 class="Payment_tag">Payment</h4>
              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
                  <label class="custom-control-label" for="credit">pay cash at shipment</label>
                </div>
              </div>
  


              <hr class="mb-4" />
              <button class="btn btn-primary btn-lg btn-block" type="button">Confirm</button>
            </form>
          </div>
        </div>
  
      </div>
  
      </div>
      )}


      {(!CheckState)&& (
        <div>
            <div> {(total_price > 0 ) && (<div className='total_price'> purchase Total  {total_price} TND </div>)} </div>

        <div class="shopping-cart-1">{showItems}</div>
        {state.length > 0 ? (
          <div> 
            <div className="check-out">
              <span onClick={(e)=> {SetCheckState(true)}}>Check out</span>
            </div>

          </div>
          

        ) : null}

      </div>

      
      )}
    


    </div>
  );
}

export default Cart;
