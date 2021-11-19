import React from "react";
import AdminNav from "../Components/Navbar";

export default function MileageAccount() {
  return (
    <>
      <AdminNav />

      <div className="mt-5">

        <div className="card shadow-sm border-0 px-3 col-sm-4 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <h3 className="text-center">Mileage Account</h3>
          <div className="row">
            <div className="col mx-auto mt-5">
              <div className="col mt-3 mx-auto">
                <div className="row">
                  <div className="col">
                    <div className=" form-group mb-4">
                      <label className="mb-0">Full Name</label>
                      <input
                        name="fullname"
                        type="text"
                        className="form-control shadow"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Number Of Miles Earned</label>
                      <input
                        name="dates"
                        type="text"
                        className="form-control shadow"
                        placeholder="Miles"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label className="mb-0">Redeem type</label>
                      <select
                        name="Type"
                        type="text"
                        className="form-control  shadow form-select"
                      >
                        <option selected disabled>
                          Gift card
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-4">
                      <label className="mb-0">DOB</label>
                      <input
                        name="from"
                        type="text"
                        className="form-control shadow"
                        placeholder="DOB"
                      />
                    </div>

                    <div className="form-group mb-5">
                      <label className="mb-0">Frequent Flyer Number</label>
                      <input
                        name="dates"
                        type="text"
                        className="form-control shadow"
                        placeholder="FF Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="row col-12">
                  <p className="p-0 small mb-0 text-end">
                    Book a flight to start earning
                  </p>
                  <div className="col mx-2  p-0">
                    <button className="btn w-100 btn-primary">Redeem</button>
                  </div>
                  <div className="col mx-2 p-0">
                    <button className="btn w-100 btn-primary">
                      Book flight{" "}
                    </button>
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
