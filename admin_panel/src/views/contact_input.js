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

export default function Contact_input() {

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">


      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>



          <MDBInput wrapperClass='mb-4' label='contact email' id='form2' type='password'/>
          <MDBInput wrapperClass='mb-4' label='contact phone number' id='form2' type='password'/>
          <MDBInput wrapperClass='mb-4' label='About US' id='form2' type='password'/>


          <MDBBtn className="mb-4 w-100">Save</MDBBtn>

        </MDBTabsPane>


      </MDBTabsContent>

    </MDBContainer>
  );
}

