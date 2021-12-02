import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import AdminNav from "../Components/Navbar";
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';
import axios from "axios";
import {toast} from "react-toastify";
//import  DatePicker from '../Components/DatePicker'
import { BACKEND_HOST, BACKEND_PORT } from "../config";

function AdminPage() {
    const history = useHistory();
    const[flightId, setFlightId] = useState("");
    const[departureDate, setDepartureDate]=useState();
    const[arrivalDate, setArrivalDate]=useState();

    const handleFlightIdChange = e => {
        e.preventDefault()
        setFlightId(e.target.value)
    }

    const handleDepartureChange = e => {
        e.preventDefault()
        setDepartureDate(new Date(e.target.value).toISOString())
    }

    const handleArrivalIdChange = e => {
        e.preventDefault()
        setArrivalDate(new Date(e.target.value).toISOString())
    }

    const handleSubmit = (e)=> {
        axios({
            method:'put',
            url:`http://${BACKEND_HOST}:${BACKEND_PORT}/flights/update`,
            data: {
                flightCode: flightId,
                departureDate,
                arrivalDate
            }

        })
            .then((response) =>{
                console.log(response.data)
                if(response.status == 200){
                    const CustomToast = ({closeToast})=>{
                        return(
                            <div style={{textAlign:"center"}}>
                                <h4>Flight details updated successfully</h4>
                            </div>
                        )

                    }
                    setFlightId("")
                    setDepartureDate()
                    setArrivalDate()
                    toast.success(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
                }else{
                    const CustomToast = ({closeToast})=>{
                        return(
                            <div style={{textAlign:"center"}}>
                                <h4>Error updating flight</h4>
                            </div>
                        )

                    }
                    toast.error(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
                }
            })
            .catch((err) =>{
                console.log(err)
                const CustomToast = ({closeToast})=>{
                    return(
                        <div style={{textAlign:"center"}}>
                            <h4>Email updating flight : {err.msg}</h4>
                        </div>
                    )

                }
                toast.error(<CustomToast />, {position: toast.POSITION.BOTTOM_CENTER, autoClose:true})
            })
        // }
    }

    const handleLogout = ()=>{
        history.push("/");
    }

    return (
        <div className="mt-5">
            <div
                className="card shadow-sm border-0 px-3 col-sm-11 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                <h3 className="text-center">Update Flight information</h3>
                <div className="row">
                    <div className="col  mx-auto mt-5">
                        <div className="col mt-3 mx-auto">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group mb-4">
                                        <label className="mb-0">Flight Code</label>
                                        <input
                                            name="Flight ID"
                                            type="text"
                                            className="form-control shadow"
                                            placeholder="Flight Code"
                                            onChange={handleFlightIdChange}
                                            value={flightId}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="mb-0">Departure Date</label>
                                        <input
                                            name="departure"
                                            type="date"
                                            className="form-control shadow"
                                            placeholder="Departure"
                                            onChange={handleDepartureChange}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="mb-0">Arrival Date</label>
                                        <input
                                            name="arrival"
                                            type="date"
                                            className="form-control shadow"
                                            placeholder="Arrival"
                                            onChange={handleArrivalIdChange}
                                        />
                                    </div>
                                    <button className="btn btn-primary" onClick={handleSubmit}>Update Flight</button>
                                    <br />
                                    <br />
                                    <br />
                                    <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <AdminNav />
        //     <div className="mt-5">
        //         <div className="card shadow-sm border-0 px-3 col-sm-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        //         <h3 className="text-center">Flight Status</h3>
        //             <div className="row">
        //             <div className="col  mx-auto mt-5">
        //             <div className="d-flex mx-auto">
        //             <div className="mx-1">
        //             <div className="form-check">
        //             <div className="col mt-3 mx-auto">
        //             <div className="row">
        //             <div className="col">
        //             <div className="form-group mb-4">
        //             <div style={{
        //                 margin: 'auto',
        //                 display: 'block',
        //                 width: 'fit-content'
        //             }}>
        //                 <TextField
        //                 required
        //                 type="date"
        //                 name="departureDate"
        //                 label="Choose departure date"
        //                 value={val}
        //                 InputLabelProps={{
        //                     shrink: true,
        //                   }}
        //                 onChange={handleDateInput} />
        //
        //             </div>
        //             </div>
        //             </div>
        //             </div>
        //             <div className="col">
        //             <div className="form-group mb-4">
        //               <label className="mb-0">Type</label>
        //               <select
        //                 name="Type"
        //                 type="text"
        //                 className="form-control  shadow form-select"
        //                 onChange={handleTypeInput}
        //                 value={selval}
        //               >
        //                 <option>
        //                   Economy
        //                 </option>
        //                 <option >
        //                   Business
        //                 </option>
        //                 <option >
        //                   Business Premium
        //                 </option>
        //               </select>
        //             </div>
        //             </div>
        //
        //             </div>
        //             <button className="btn btn-primary">Search flights</button>
        //             </div>
        //         </div>
        //         </div>
        //         </div>
        //
        // </div>
        // {/* console.log({valdate}); */}
        // </div>
        // </div>
        // </div>
    )
}

export default AdminPage
