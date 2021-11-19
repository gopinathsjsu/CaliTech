import React from 'react'
import AdminNav from '../Components/Navbar';

export default function Checkout() {
  return (
    <>
      <AdminNav />
      <div className="mt-5">
        <h3 className="col-3 card p-2  mx-auto text-center">Checkout</h3>

        <div className=" card mx-auto col-10">
          <div className="row">
            <div className="col mt-5">
              <div className=" p-2 form-group mb-4 col-4 mx-auto">
                <label className="mb-0">Seat Details</label>
                <input
                  name="email"
                  type="text"
                  className="form-control shadow"
                  placeholder="8A"
                />
              </div>

              <div className="card p-2 form-group mt-4 mb-4 col-4 mx-auto">
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

              <div className="form-check mt-3 mb-3 col-4 mx-auto">
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
              <div className="card p-2 col-3 mx-auto text-end mt-5 mb-3">
                <button className="btn btn-primary">Pay</button>
              </div>
            </div>
            <div className="col">
              <div className="card shadow-sm border-0 col-8 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                <h3>Travel Details</h3>
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
                    <div className="col"></div>
                    <div className="col-3">
                      <h5>$321.20</h5>
                      <h6>Mileage Points = 642.40</h6>
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
