import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";


export default function AdminNav(props) {

  const [navBarState, setnavBarState] = useState(props.trigger)
  const history = useHistory()
  const handleLogout = () =>{
     localStorage.clear()
     history.push('/')
  }
  return (
    <div className="container-fluid p-0">
      <nav
        className="navbar shadow navbar-expand-lg navbar-light px-2"
        style={{ backgroundColor: "#6bb4e1" }}
      >
        <a className="navbar-brand" href="/">
          Pacific Airlines
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          {!props.trigger ? 
            (<><li className={"nav-item"}>
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className={"nav-item"}>
              <a className="nav-link" href="/signup">
                Signup
              </a>
            </li>
            <li className={"nav-item"}>
                <a className="nav-link" href="/adminLogin">
                    Admin
                </a>
            </li></>):
            (<><li className={"nav-item"}>
            <a className="nav-link" href="/mileageaccount">
              Miles Account
            </a>
          </li>
          <li className={"nav-item"}>
            <a className="nav-link" href="/searchflights">
              Check Flights
            </a>
          </li>
          <li className={"nav-item"}>
            <a className="nav-link" href="/bookinghistory">
              Booking History
            </a>
          </li>
          <li className={"nav-item"}>
            <a className="nav-link" href="/"onClick={handleLogout}>
              Logout
            </a>
          </li></>)
            }
          </ul>
        </div>
      </nav>
    </div>
  ) 
      
}