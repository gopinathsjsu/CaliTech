import React from "react";
import AdminNav from "../Components/Navbar";

export default function SearchFlightsResult() {
  return (
    <>
      <AdminNav />

      <div className="mt-5">
        <h3 className="col-3 card p-2  mx-auto text-center">Search Result</h3>

        <div className=" card mx-auto col-8">
          <div className="row">
            <div className="col">
              <div className="card shadow-sm border-1 col-8 px-4 rounded-2 mb-6 py-2 mx-auto mt-5 bg-light">
                <div className="row">
                  <center>
                    <h6>Wed Nov 30</h6>
                  </center>
                </div>

                <div className="row">
                  <center>
                    <p>$125</p>
                  </center>
                </div>
              </div>
            </div>
            <div className="col">
              <div
                className="card shadow-sm border-1 col-8 px-4 rounded-2 mb-6 py-2 mx-auto mt-5 "
                style={{ backgroundColor: "#ADD8E6" }}
              >
                <div className="row">
                  <center>
                    <h6>Fri Nov 30</h6>
                  </center>
                </div>

                <div className="row">
                  <center>
                    <p>$125</p>
                  </center>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm border-1 col-8 px-4 rounded-2 mb-6 py-2 mx-auto mt-5 bg-light">
                <div className="row">
                  <center>
                    <h6>Tue Nov 30</h6>
                  </center>
                </div>

                <div className="row">
                  <center>
                    <p>$125</p>
                  </center>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm border-1 col-8 px-4 rounded-2 mb-6 py-2 mx-auto mt-5 bg-light">
                <div className="row">
                  <center>
                    <h6>Tue Nov 30</h6>
                  </center>
                </div>

                <div className="row">
                  <center>
                    <p>$125</p>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card shadow-sm border-1 col-6 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                <div className="row">
                  <div className="col">
                    <div className="col">
                      <b>1.30 AM -- 2.30 PM</b>
                    </div>
                    <div className="col">14h 0m * 1 Stop * FRA</div>
                  </div>
                  <div className="col">
                    <div className="col">12-Dec-2021</div>
                    <div className="col">Airline Name</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">departureLocation</div>
                  <div className="col">arrivalLocation</div>
                </div>
                <div className="row">
                  <div className="col">Total Seat :50</div>
                  <div className="col">flightType</div>
                </div>
                <div className="row">
                  <div className="col">Booked Seat :10.15</div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button className="btn btn-primary">Book</button>
                  </div>
                  <div className="col-4">
                    <h5>$321.20</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: -30 }}>
            <div className="col">
              <div className="card shadow-sm border-1 col-6 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                <div className="row">
                  <div className="col">
                    <div className="col">
                      <b>1.30 AM -- 2.30 PM</b>
                    </div>
                    <div className="col">14h 0m * 1 Stop * FRA</div>
                  </div>
                  <div className="col">
                    <div className="col">12-Dec-2021</div>
                    <div className="col">Airline Name</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">departureLocation</div>
                  <div className="col">arrivalLocation</div>
                </div>
                <div className="row">
                  <div className="col">Total Seat :50</div>
                  <div className="col">flightType</div>
                </div>
                <div className="row">
                  <div className="col">Booked Seat :10.15</div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button className="btn btn-primary">Book</button>
                  </div>
                  <div className="col-4">
                    <h5>$321.20</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
