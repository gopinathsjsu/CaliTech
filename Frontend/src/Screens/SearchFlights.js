import React from "react";
import AdminNav from "../Components/Navbar";

export default function SearchFlights() {
  return (
    <>
      <AdminNav />
      <div className="mt-5">
        <div className="card shadow-sm border-0 px-3 col-sm-6 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <h3 className="text-center">Search Flights</h3>
          <div className="row">
            <div className="col  mx-auto mt-5">
              <div className="d-flex mx-auto">
                <div className="mx-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Default radio
                    </label>
                  </div>
                </div>
                <div className="mx-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Default checked radio
                    </label>
                  </div>
                </div>
                <div className="mx-1">
                  <div className="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Book with Miles
                    </label>
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
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Dates</label>
                      <input
                        name="dates"
                        type="text"
                        className="form-control shadow"
                        placeholder="10/18/21 - 10/21/21"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Type</label>
                      <select
                        name="Type"
                        type="text"
                        className="form-control  shadow form-select"
                      >
                        <option>
                          Economy
                        </option>
                        <option >
                          Business
                        </option>
                        <option >
                          Business Premium
                        </option>
                      </select>
                    </div>
                    <button className="btn btn-primary">Search flights</button>
                  </div>
                  <div className="col">
                    <div className="form-group mb-4">
                      <label className="mb-0">To</label>
                      <input
                        name="from"
                        type="text"
                        className="form-control shadow"
                        placeholder="To"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Travellers</label>
                      <input
                        name="dates"
                        type="text"
                        className="form-control shadow"
                        placeholder="1 Adult"
                      />
                    </div>
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
