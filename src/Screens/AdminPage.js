import {React, useState} from 'react'
import AdminNav from "../Components/Navbar";
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';
//import  DatePicker from '../Components/DatePicker'

function AdminPage() {
    // const initVal = {
    //     departureDate: format(new Date(), 'yyyy-MM-dd'),

    // }
    const[val, setVal] = useState("");
    const[selval, setselVal]=useState("");

    const handleDateInput = e => {
        //console.log('e.target' + e.target.value);
        //const {name,value} = e.target.value
        console.log('e.target after const' + e.target.value)
        setVal(e.target.value)
        //console.log('val' +val);
    }

    const handleTypeInput = e => {
        setselVal(e.target.value)
        console.log(selval);

    }
    return (
        <div>
            <AdminNav />
            <div className="mt-5">
                <div className="card shadow-sm border-0 px-3 col-sm-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                <h3 className="text-center">Flight Status</h3>
                    <div className="row">
                    <div className="col  mx-auto mt-5">
                    <div className="d-flex mx-auto">
                    <div className="mx-1">
                    <div className="form-check">
                    <div className="col mt-3 mx-auto">
                    <div className="row">
                    <div className="col">
                    <div className="form-group mb-4">
                    <div style={{
                        margin: 'auto',
                        display: 'block',
                        width: 'fit-content'
                    }}>
                        <TextField
                        required
                        type="date"
                        name="departureDate"
                        label="Choose departure date"
                        value={val}
                        InputLabelProps={{
                            shrink: true,
                          }}
                        onChange={handleDateInput} />
                    
                    </div>   
                    </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group mb-4">
                      <label className="mb-0">Type</label>
                      <select
                        name="Type"
                        type="text"
                        className="form-control  shadow form-select"
                        onChange={handleTypeInput}
                        value={selval}
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
                    </div>
                    
                    </div>
                    <button className="btn btn-primary">Search flights</button>
                    </div>
                </div>
                </div>
                </div>
            
        </div>
        {/* console.log({valdate}); */}
        </div>
        </div>
        </div>
    )
}

export default AdminPage
