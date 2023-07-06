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


export default function Login_register() {

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [password, Setpassword] = useState('');
  const [email, SetEmail] = useState('');
  
  const [Regpassword, SetRegpassword] = useState('');
  const [Regemail, SetRegEmail] = useState('');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  //           <input placeholder='Password' style={{width:"100%"}}id='form2' type='password'  onChange={(e)=>{console.log(e.target.value)}}/>
  const login =(()=>{
    const url = 'http://localhost:5000/login';
    const formData =  {"email" : email.toString()  , "password":password.toString()};
    console.log(email ,password , formData ) ; 

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

  const register =(()=>{

    const url = 'http://localhost:5000/register';
    const formData =  {"reg_email" : Regemail.toString()  , "reg_password":Regpassword.toString()};
    console.log(formData ) ; 

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

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(e)=>{SetEmail(e.target.value)}} />
          <MDBInput wrapperClass='mb-4' label='Password ' id='form1' type='password'  onChange={(e)=>{Setpassword(e.target.value)}} />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="Forgot_password">Forgot password?</a>
          </div>
          <div className='the_floffy_btn'>
          
     
          <MDBBtn className="mb-4 w-100" onClick={(e)=>{
            e.preventDefault()
            login() ; 
          }}>Sign in</MDBBtn>
          </div>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'  onChange={(e)=>{SetRegEmail(e.target.value)}} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'  onChange={(e)=>{SetRegpassword(e.target.value)}}  />

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>
          <div className='the_floffy_btn'>
            <MDBBtn className="mb-4 w-100"
            onClick={(e)=>{
              e.preventDefault()
              register() ; 
            }}
            >Sign up</MDBBtn>


          </div>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

