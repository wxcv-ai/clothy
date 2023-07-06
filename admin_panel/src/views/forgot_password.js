import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';


export default function Forgot_password() {

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [email, SetEmail] = useState('');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const forget_password =(()=>{
    const url = 'http://localhost:5000/forget_password';
    const formData =  {"email" : email.toString() };
    console.log( formData ) ; 

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*'
        },
    };
    
    axios.post(url, formData, config)
    .then((response) => {
    })
    .catch((err) => {
        console.log("err") ; 
    }) ;

    return 0 ;
  })
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">


      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>



          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'  onChange={(e)=>{SetEmail(e.target.value)}} />


          <MDBBtn className="mb-4 w-100" onClick={(e)=>{forget_password(); }}>Confirm</MDBBtn>

        </MDBTabsPane>


      </MDBTabsContent>

    </MDBContainer>
  );
}

