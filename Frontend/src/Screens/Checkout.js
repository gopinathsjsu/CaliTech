import React, { useState, useEffect } from "react";
import AdminNav from "../Components/Navbar";
import Pickseat from "./Pickseat";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
export default function Checkout() {
  //const [modalShow, setModalShow] = React.useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const[basePrice,setBasePrice]=useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[selectSeat, setselectSeat]= useState([])
  const [flightDetails, setFlightDetails] = useState();
  useEffect(() => {
    const flgt_id = localStorage.getItem("flight_id");
    //const flgt_price = localStorage.getItem("flight_price");

    axios.get(`http://localhost:5676/flights/${flgt_id}`).then((res) => {
      console.log("response", res);
      setFlightDetails(res.data);
      //setBasePrice(flgt_price)
    });
  }, []);
  const updatePrice = (price,seats) => {
    setTotalPrice(totalPrice + price);
    setselectSeat([...selectSeat, seats])
  };
  const handlePayment = () => {
    const userid = localStorage.getItem('userdetails')
    console.log(userid)
    axios.post('http://localhost:5676/users/createFlightBooking', {flightId:flightDetails._id, userId:userid , seatNumbers:selectSeat, status:"Booked", totalPrice:totalPrice})
    .then((res) => {
      console.log(res)
      handleShow()
      // this.props.history.push('/profilecreation');
    })
    .catch((err) => {
      console.log(err)
    })

    
  };
  return (
    <>
      <AdminNav trigger />
      <div className="mt-5">
        <div className=" card mx-auto col-8">
          <div className="row">
            <h1 className="text-center mt-2">Checkout</h1>
            <div className="col mt-3">
              <div className=" p-2 form-group mb-4 col-4 mx-auto w-50">
                <label className="mb-0">Select Seat</label>
              </div>

              <Pickseat updatePrice={updatePrice} />

              <div className="form-check mt-3 mb-3 col-4 mx-auto w-50">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Travel Insurance required
                </label>
              </div>
            </div>
            <div className="col mt-3">
              <div className="px-3 rounded-2 mb-3  mx-auto">
                <h3 className="text-center">Travel Details</h3>
                <div
                  className="card-body m-2"
                  style={{ border: "1px solid black" }}
                >
                  <p className={"font-weight-bold"} style={{ fontWeight: 600 }}>
                    {flightDetails?.departureLocation} to{" "}
                    {flightDetails?.arrivalLocation}
                  </p>
                  <div className="row">
                    <div className="col">
                      {flightDetails &&
                        moment(flightDetails.departureDateTime).format(
                          "MMM Do YY HH:MM"
                        )}{" "}
                      to{" "}
                      {flightDetails &&
                        moment(flightDetails.arrivalDateTime).format(
                          "MMM Do YY HH:MM"
                        )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <h5>Base Price: ${flightDetails?.price}</h5>
                      <h5>Total Price: ${totalPrice + flightDetails?.price}</h5>
                      <h6>Mileage Points = 642.40</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 w-25 mx-auto mt-3 mb-2 text-center">
            <button
              className="btn btn-primary w-75 font-weight-bold"
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Booking Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Sucess! Your booking has been confirmed</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
