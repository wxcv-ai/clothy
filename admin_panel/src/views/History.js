import React from "react";

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

function History() {

  var all_tab_data2  = [{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,
  {"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} ,{"id":  0 , "name" : "aaaaaaa" , "salaray" : '4586'} 
  ]
  console.log(all_tab_data2 , "all_tab_data2") ; 


  return (
    <>
      <Container fluid>
        <Row>
         
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
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
                    
                    all_tab_data2.map( (item, i) => {
                        return (<tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.salaray}</td>
                          <td>{i}</td>
          
                        </tr>)
                      } )
      
                  }
                    
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$7ggggggggg8,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default History;
