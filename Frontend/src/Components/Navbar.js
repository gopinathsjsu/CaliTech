import React, { useEffect, useState } from "react";


export default function AdminNav(props) {
  return (
    <div className="container-fluid p-0">
      <nav
        className="navbar shadow navbar-expand-lg navbar-light px-2"
        style={{ backgroundColor: "#A9A9A9" }}
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
            </li></>):
            (<><li className={"nav-item"}>
            <a className="nav-link" href="/profile">
              Miles Account
            </a>
          </li>
          <li className={"nav-item"}>
            <a className="nav-link" href="/miles">
              Check Flights
            </a>
          </li></>)
            }
          </ul>
        </div>
      </nav>
    </div>
  ) 
      
}