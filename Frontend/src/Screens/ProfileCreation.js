import axios from 'axios';
import {React, useState} from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../Components/Navbar';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particle from '../Components/Particle';
import { BACKEND_HOST, BACKEND_PORT } from "../config";

toast.configure();

function ProfileCreation() {
const history = useHistory();
    const [passport,setPassport] = useState("")
    const [address, setAddress]  = useState("")
    const[phone, setPhone] = useState("")
    const handlePassport = (e) =>{
        setPassport(e.target.value)
    
    }
    const handlesignIn = () => {
      localStorage.setItem('accesstoken', "hello");
      const custName = localStorage.getItem('custname');
      const custDetailsId = localStorage.getItem('custid')
      const custemail = localStorage.getItem('custemail')
      axios.put(`http://${BACKEND_HOST}:${BACKEND_PORT}/users/update`, {id:custDetailsId, name:custName,  number:phone, email:custemail, address:address, passportNumber:passport})
      .then((res)=>{
        console.log(res)
        const CustomToast = ({closeToast})=>{
          return(
            <div style={{textAlign:"center"}}>
              <h4>Profile Update Successfully!</h4>
            </div>
          )
        
        }
        toast.success(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})

        localStorage.clear()
      })
      .catch((err)=>{
        const CustomToast1 = ({closeToast})=>{
          return(
            <div style={{textAlign:"center"}}>
              <h4>Error updating the user</h4>
            </div>
          )
        
        }
        toast.error(<CustomToast1 />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
      })
      history.push('/login')
    }

    const handleInputAddress = (e) => {
        setAddress(e.target.value)
    }

    const handlePhone = (e) => {
      setPhone(e.target.value)
    }
    return (
        <>
        <Particle/>
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
                required="required"
                onChange={handlePassport}
              />
            </div>
            <div className="form-group mb-3">
              <label className="mb-0">
                Phone<span className="text-danger">*</span>
              </label>
              <input
                name="phone"
                className="form-control"
                placeholder="Phone number"
                value={phone}
                required="required"
                onChange={handlePhone}
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
                value={address}
                onChange={handleInputAddress}
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
