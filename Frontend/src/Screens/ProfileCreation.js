import {React, useState} from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../Components/Navbar';



function ProfileCreation() {
const history = useHistory();
    const [passport,setPassport] = useState("")
    const handlePassport = (e) =>{
         const passport = e.target.value
        setPassport(passport)
    
    }
    const handlesignIn = () => {
      localStorage.setItem('accesstoken', "hello");
      history.push('/mileageaccount')
    }
    return (
        <>
        <AdminNav />
        <div className="card shadow-sm border-0 px-3 col-sm-4 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <div className="card-header bg-transparent border-0 text-center text-uppercase">
          <h5>Hi there! please complete your profile</h5>
        </div>
        <div className="card-body">
          <form
            action="/"
            // onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
            autoComplete="off"
          >
            <div className="form-group mb-3">
              <label className="mb-0">
                Passport Number<span className="text-danger">*</span>
              </label>
              <input
                name="passport"
                type="string"
                className="form-control"
                placeholder="Passport Number"
                value={passport}
                required
                onChange={handlePassport}
                // onBlur={this.handleEmailBlur}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-0">
                Address Line1<span className="text-danger">*</span>
              </label>
              <input
                name="address1"
                type="address"
                className="form-control"
                placeholder="Address"
                // value={address1}
                // onChange={handleInput}
              />
            </div>
            <div className="form-group mb-3">
            <label className="mb-0">Address Line 2</label>
            
            <input
                name="address1"
                type="address"
                className="form-control"
                placeholder="Apt #" 
                // value={address2}
                // onChange={handleInput}
            />
            </div>
            <div className="text-center">
              <input
                type="button"
                className="btn btn-primary w-30"
                value="Save"
                onClick={handlesignIn}
              />
            </div>
          </form>
        </div>
      </div>
    
        </>
    )}

export default ProfileCreation
