import axios from "axios";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AdminNav from "../Components/Navbar";
import "./BookingHistory.css";
import moment from "moment";
import {Modal, Button} from 'react-bootstrap'
import Particle from '../Components/Particle'
import '../Css files/Project.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function BookingHistory() {
  const [bookingDetails, setBookinbDetails] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getFlights()
  }, []);
  const getFlights = () => {
    const userid = localStorage.getItem("userdetails");
    axios
    .post("http://localhost:5676/users/flightBookings", { userId: userid })
    .then((res) => {
      setBookinbDetails(res.data);
      console.log(res.data);
    });
  }
  const handleCancel = (val) =>{
    axios.put('http://localhost:5676/users/cancelFlightBooking', {flightId:val.flightId, id:val._id, userId:val.userId , seatNumbers:val.seatNumbers, status:"cancelled", totalPrice:val.totalPrice})
    .then((res) => {
      console.log(res)
      handleShow()
      // this.props.history.push('/profilecreation');
    })
    .catch((err) => {
      console.log(err)
    })
    getFlights()
  }
  return (
    <>
    <Particle/>
      <AdminNav trigger />
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pastflights" title="Past Flights">
          {bookingDetails?.map((val) => {
             return moment().isAfter(val.departureDateTime) && val.status == 'Booked' &&
               (
                <div className="Flightlist">
                  <ul>
                    <li style={{ listStyle: "none" }}>
                      Flight Name: {val.airlineName}
                    </li>
                    <li style={{ listStyle: "none" }}>
                     Departure Location: {val.departureLocation}
                    </li>
                    <li style={{ listStyle: "none" }}>
                     Arrival Location: {val.arrivalLocation}
                    </li>
                  </ul>
                </div>
              );
            }
          )}
        </Tab>
        <Tab eventKey="upcomingflights" title="Upcoming Flights">
        {bookingDetails?.map((val) => {
             return moment().isBefore(val.departureDateTime) && val.status == 'Booked' &&
               (
                <div className="Flightlist">
                  <ul>
                  <li style={{ listStyle: "none" }}>
                      Flight Name: {val.airlineName}
                    </li>
                    <li style={{ listStyle: "none" }}>
                     Departure Location: {val.departureLocation}
                    </li>
                    <li style={{ listStyle: "none" }}>
                     Arrival Location: {val.arrivalLocation}
                    </li>
                    
                  </ul>
                  <div><button onClick={()=>handleCancel(val)}> Cancel </button></div>
                </div>
              );
            }
          )}
        </Tab>
      </Tabs>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Booking Cancelled</Modal.Title>
            </Modal.Header>
            <Modal.Body>You booking has been cancelled sucessfully!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </>
  );
}

export default BookingHistory;
