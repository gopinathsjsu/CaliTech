import React, {useEffect, useState} from "react";
import AdminNav from "../Components/Navbar";
import Particle from '../Components/Particle'
import { useHistory } from "react-router-dom";
import '../Css files/Project.css';
import axios from "axios";
import {BACKEND_HOST, BACKEND_PORT} from "../config";

export default function MileageAccount() {
  const history = useHistory();
  const details = JSON.parse(localStorage.getItem('allDetails'))

  const [customerDetails, setCustomerDetails] =useState({})
  useEffect(() => {

    axios.get(`http://${BACKEND_HOST}:${BACKEND_PORT}/users/${details.id}`).then((res) => {
      console.log("response", res);
      setCustomerDetails(res.data[0]);
      localStorage.setItem("miles", res.data[0].mileagePoints)
      //setBasePrice(flgt_price)
    });
  }, []);

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

    const handleClick = (e)=>{
      history.push('/searchflights')
    }

  return (
    <>
      <Particle/>
      <AdminNav trigger/>
      <div className="mt-5">

        <div className="card shadow-sm border-0 px-3 col-sm-8 rounded-2 mb-3 py-4 mx-auto mt-6 bg-light">
        <h3 className="text-center">Mileage Account</h3>
          <div className="row">
            <div className="col mx-auto mt-4">
              <div className="col mt-3 mx-auto">
                <div className="row">
                  <div className="col">
                    <div className=" form-group mb-4">
                      <label className="mb-0">Full Name</label>
                      <p>{customerDetails.name}</p>
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Number Of Miles Earned</label>
                      <p>{customerDetails.mileagePoints}</p>
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Passport Number</label>
                      <p>{customerDetails.passportNumber}</p>
                    </div>
                  </div>
                  <div className="col">
                    {/*<div className="form-group mb-4">*/}
                    {/*  <label className="mb-0">Phone</label>*/}
                    {/*</div>*/}

                    <div className="form-group mb-5">
                      <label className="mb-0">Frequent Flyer Number</label>
                      <p>{customerDetails.FFNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="row col-5">
                  
                  <div className="col mx-0  p-0">
                    {/* <button className="btn w-40 btn-primary">Redeem</button> */}
                  </div>
                  
                    
                  
                </div>
              </div>

            </div>
          </div>
          <div className="text-center">
          <p className="p-0 small mb-0">
                    Book a flight to start earning
                  </p>
          <button className="btn w-40 btn-primary" style={{styleObj}} onClick={handleClick}>
                      Book flight{" "}
                    </button>
                    </div>
        </div>
      </div>
    </>
  );
}
