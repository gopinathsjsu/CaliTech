import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNav from "../Components/Navbar";
import DisplayFlight from "./DisplayFlight";
import Particle from '../Components/Particle'
import '../Css files/Project.css';
// import DateRangePicker from '@wojtekmaj/react-daterange-picker'

export default function SearchFlights() {
  const [flightDetails, setFlightDetails] = useState();
  const [filteredFlights, setfilteredFlights] = useState([]);
  const [flightData, setflightData] = useState({
    flighttype: "Economy",
    departuredate: '',
    arrivalDate:'',
    deploc: "",
    arrloc: "",
  });
  useEffect(() => {
    axios.get("http://localhost:5676/flights").then((res) => {
      console.log("response", res);
      console.log(filteredFlights.length)
      setFlightDetails(res.data);
    });
  }, []);
  const searchFlightHandle = () => {
    // console.log("flightdata", flightData);

    const { flighttype, departuredate, arrivalDate, deploc, arrloc } = flightData;
    let res = flightDetails.filter(
      
      (val) =>
        val.departureLocation == deploc &&
        val.arrivalLocation == arrloc &&
        val.flightType == flighttype 
    );
    setfilteredFlights(res);
    
  };
  const styleObj={
    backgroundColor:"green", 
    border: "black",
    color:"white",
    padding: "10px 10px",
    textAlign: "center",
    display: "inline-block",
    fontSize: "20px",
    fontFamily: "serif",
      
    
    }

    const formObj={
      padding:"10px",
    width: "430px",
    margin: "8px 0",
    borderRadius: "10px",
    borderColor:"black"
    }
  return (
    <>
      <AdminNav trigger/>
      {filteredFlights.length > 0 ? (
        <DisplayFlight flightData={filteredFlights} />
      ) : (
        <div className="mt-5">
          <div className="card shadow-sm border-0 px-3 col-sm-11 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <h3 className="text-center">Search Flights</h3>
            <div className="row">
              <div className="col  mx-auto mt-5">
                <div className="d-flex mx-auto">
                  <div className="mx-1">
                    <div className="form-check">
                    </div>
                  </div>
                  <div className="mx-1">
                    <div className="form-check">

                    </div>
                  </div>
                  <div className="mx-1">
                    <div className="form-check">
                    </div>
                  </div>
                </div>
                <div className="col mt-3 mx-auto">
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-4">
                        <label className="mb-0">From</label>
                        <input
                          name="from"
                          type="text"
                          className="form-control shadow"
                          placeholder="From"
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              deploc: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="mb-0">Departure Date</label>
                        <input
                          name="dates"
                          type="date"
                          style={formObj}
                          className="form-control shadow"
                          placeholder=""
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              departuredate: e.target.value,
                            });
                          }}
                        />
                        {/* <DateRangePicker
                        className="form-control shadow"
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              departuredate: e,
                            })}}
                          value={flightData.departuredate}
                        /> */}
                      </div>

                      <div className="form-group mb-4">
                        <label className="mb-0">Type</label>
                        <select
                          name="Type"
                          style={formObj}
                          type="text"
                          className="form-control  shadow form-select"
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              flighttype: e.target.value,
                            });
                          }}
                        >
                          <option>Economy</option>
                        </select>
                      </div>
                      <button
                      style={{styleObj,background:'grey'}}
                        className="btn btn-primary"
                        onClick={searchFlightHandle}
                      >
                        Search flights
                      </button>
                    </div>
                    <div className="col">
                      <div className="form-group mb-4">
                        <label className="mb-0">To</label>
                        <input
                          name="from"
                          type="text"
                          className="form-control shadow"
                          placeholder="To"
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              arrloc: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label className="mb-0">Arrival Date</label>
                        <input
                          name="dates"
                          type="date"
                          style={formObj}
                          className="form-control shadow"
                          onChange={(e) => {
                            setflightData({
                              ...flightData,
                              arrivalDate: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
