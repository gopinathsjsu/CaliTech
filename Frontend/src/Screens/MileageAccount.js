import React from "react";
import AdminNav from "../Components/Navbar";
import Particle from '../Components/Particle'
import '../Css files/Project.css';

export default function MileageAccount() {
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
                      <p>{''}</p>
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Number Of Miles Earned</label>
                      <p>{''}</p>
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Passport Number</label>
                      <p>{''}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-4">
                      <label className="mb-0">Phone</label>
                    </div>

                    <div className="form-group mb-5">
                      <label className="mb-0">Frequent Flyer Number</label>
                      <p>{'123'}</p>
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
          <button className="btn w-40 btn-primary" style={{styleObj}}>
                      Book flight{" "}
                    </button>
                    </div>
        </div>
      </div>
    </>
  );
}
