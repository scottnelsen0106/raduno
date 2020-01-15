import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Modal, Button, Form, Card, ListGroup, Row, Col, ButtonGroup, Container, Nav, ButtonToolbar} from 'react-bootstrap';
import "./EventNav.css";
import './styleModal.css';
import Axios from "axios";


class EventNav extends React.Component {

  state = {
    showRsvpForm: false,
    showEventInfo: false,
    rsvpName: "",
    rsvpNumberInParty: 0,
    rsvpTypeofDish: "",
    rsvpNameofDish: ""
  };

  handleCloseRsvpForm  = event => {
   this.setState({showRsvpForm: false});
   this.setState({
    rsvpName: "",
    rsvpNumberInParty: 0,
    rsvpTypeofDish: "",
    rsvpNameofDish: ""   
    });
  };

  handleShowRsvpForm  = event => {
    this.setState({showRsvpForm: true});
   };

  handleCloseEventInfo  = event => {
   this.setState({showEventInfo: false});
  };

  handleShowEventInfo  = event => {
    this.setState({showEventInfo: true});
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState(
        {[name]:value}
      );
      console.log(this.state);
  } 
  
  handleRsvpFormSubmit = event =>{
    event.preventDefault();

    Axios.post('/event/rsvp/1', {
      event_id: 1,  
      rsvpName: this.state.rsvpName,
      rsvpNumberInParty: this.state.rsvpNumberInParty,
      rsvpTypeofDish: this.state.rsvpTypeofDish,
      rsvpNameofDish: this.state.rsvpNameofDish
    })
    .then(function(result) {
      console.log(result.data);
    })
    .catch(function(error) {
      console.log(error);
    });
    this.handleCloseRsvpForm();
  }

  render() {
    return (
    <>
    <Navbar fixed="top" expand="lg" className="colorEvent justify-content-between">
      
        
        
        
          {/* <div class="containerBtn"> */}
          <div className="events">
            <Navbar.Text>
               <div className="eventsTitle"> 
                
                Events
                
               </div> 
              
              
                <div className="userName">
                  
                  Hosted By: Austin Graves
                  
                </div>
                
        </Navbar.Text>
           </div>    
                <div className="containerCount">
                
          <div className="invitedNum">
            Invited:
          </div>
          
          
          
            <div className="rsvpCount">
              RSVP:
            </div>
           
       
           </div>     
          <ButtonToolbar>
            <Button  className="eventButtonInfo" onClick={this.handleShowEventInfo}>Event Info</Button>
            

            
            <Button className="eventButtonRSVP" onClick={this.handleShowRsvpForm}>RSVP Here</Button>
           
            
            </ButtonToolbar>


          {/* </div> */}
         
          
      </Navbar>

    <Modal show={this.state.showRsvpForm} onHide={this.handleCloseRsvpForm}>
    <Modal.Header className="modalHeader" closeButton>
      <Modal.Title>Create Your Event</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
        <Form className="modalBody">

        <Form.Group>
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" name="rsvpName" value={this.state.rsvpName} onChange={this.handleInputChange}  placeholder="Enter Name Here" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Number of People in Your Party (total)</Form.Label>
          <Form.Control type="number" name="rsvpNumberInParty" value={this.state.rsvpNumberInParty} onChange={this.handleInputChange} min="1" placeholder="1" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type of Dish</Form.Label>
          <Form.Control as="select" name="rsvpTypeofDish" value={this.state.rsvpTypeofDish} onChange={this.handleInputChange}>
            <option>Main</option>
            <option>Side</option>
            <option>Dessert</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Name of Dish</Form.Label>
          <Form.Control type="text" name="rsvpNameofDish" value={this.state.rsvpNameofDish} onChange={this.handleInputChange} placeholder="Enter Name of Dish Here" />
        </Form.Group>

      </Form>
    </Modal.Body>

    <Modal.Footer className="modalFooter">
      <Button variant="secondary" onClick={this.handleCloseRsvpForm} >Close</Button>

      <Button className="btn btn-primary submit-btn"
       disabled = {!(this.state.rsvpName && 
        this.state.rsvpNumberInParty && this.state.rsvpNumberInParty && this.state.rsvpNameofDish
        )}
      variant="primary" type="submit" onClick={this.handleRsvpFormSubmit}>Submit</Button>

    </Modal.Footer>
    </Modal>

    <Modal show={this.state.showEventInfo} onHide={this.handleCloseEventInfo}>
    <Modal.Header className="modalHeader" closeButton>
      <Modal.Title>Event Information</Modal.Title>
    </Modal.Header>
  
    <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
      <Card>
        <Card.Body>
          <Card.Title>Event Name.props</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <b>Date:</b> this.props.date
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Time:</b> this.props.time
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Address:</b> this.props.address
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Description:</b> this.props.description I'm testing this to see how much info about the event you can put in here. hopefully, it is a lot in case some people are super long winded. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
              </ListGroup.Item>
            </ListGroup>
        </Card.Body>
      </Card>
          
    </Modal.Body>
  
    <Modal.Footer className="modalFooter">
      <Button variant="secondary" onClick={this.handleCloseEventInfo} >Close</Button>
    </Modal.Footer>
    </Modal>
    </>
    )
  }
};

export default EventNav;