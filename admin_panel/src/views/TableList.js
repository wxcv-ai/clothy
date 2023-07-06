import React from "react";
import {useState} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import Popup from "components/popup/Popup";


function TableList() {

  var all_tab_data  = [{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "achref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "achref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "acfffffffffffffffffhref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "achref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "achref" , "salaray" : '4586'} ,{"id":  0 , "name" : "achref" , "salaray" : '4586'} 


]
  const [trigger , setTrigger] = useState(false) ; 
  const [add_trigger , setadd_trigger] = useState(false) ; 

  const [phrase_conf , setphrase_conf] = useState("") ; 

  
  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  <button className="confirm_btn" onClick={(e)=> {setadd_trigger(true)  ;}}  > add new product </button>  

                  
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    
                      all_tab_data.map( (item, i) => {
                        return (<tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.salaray}</td>
                          <td>{i}</td>
                          <td> <button className="confirm_btn"  onClick={(e)=> {setTrigger(true)  ;}} > edit </button>   </td>
                          <Popup 
                          trigger={trigger} 
                          setTrigger={setTrigger}
                          phrase_conf={phrase_conf}
                        />  
  
                        </tr>)
                      } )
      
                  }
                    
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>

              <Popup 
                          trigger={add_trigger} 
                          setTrigger={setadd_trigger}
                          phrase_conf={phrase_conf}
                        />               
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
