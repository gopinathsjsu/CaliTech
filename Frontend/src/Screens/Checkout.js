import React from "react";
import AdminNav from "../Components/Navbar";

export default function Checkout() {
  return (
    <>
      <AdminNav />
      <div className="mt-5">
        <div className=" card mx-auto col-8">
          <div className="row">
            <h1 className="text-center mt-2">Checkout</h1>
            <div className="col mt-3">
              <div className=" p-2 form-group mb-4 col-4 mx-auto w-50">
                <label className="mb-0">Seat Details</label>
                <input
                  name="email"
                  type="text"
                  className="form-control shadow"
                  placeholder="8A"
                />
              </div>

              <div className="p-2 form-group mt-4 mb-4 col-4 mx-auto w-50">
                <label className="mb-0">Additionals</label>
                <select
                  name="email"
                  type="text"
                  className="form-control  shadow form-select"
                >
                  <option selected disabled>
                    Select AddOns
                  </option>
                </select>
              </div>

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
                    San Jose to Phoenix
                  </p>
                  <div className="row">
                    <div className="col">Sun Nov 14 4:00pm to 10:27pm</div>
                    <div className="col-3">1 stop</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <h5>$321.20</h5>
                      <h6>Mileage Points = 642.40</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 w-25 mx-auto mt-3 mb-2 text-center">
            <button className="btn btn-primary w-75 font-weight-bold">
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
