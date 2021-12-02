import React, {memo, } from "react";
import './displayflight.css'
import { useHistory } from 'react-router'
import Checkout from './Checkout'
import Particle from '../Components/Particle'
import '../Css files/Project.css';

function DisplayFlight(props) {
  const history = useHistory();
  const checkoutHandle = (_id,price) =>{
    console.log(_id);
    localStorage.setItem('flight_id', _id);
    localStorage.setItem('flight_price', price);
    history.push('/checkout');
  }
  console.log(props)
  return (
    <>
    <Particle/>
      <div
        style={{
          padding: "1.5rem",
        }}
      >
        {props.flightData?.map((val) => (
        <div className="Flightlist">
        
           
            <ul >
            <li
              style={{listStyle:'none'
                
              }}
            >
              Flight Name:  {val.airlineName} 
              
            </li>
            <li
              style={{
                listStyle:'none'
              }}
            >Departure Location: {val.departureLocation}</li>
            <li
              style={{
                listStyle:'none'
              }}
            >Arrival Location: {val.arrivalLocation}</li>
            <span>

            <button onClick={() => checkoutHandle(val._id,val.price)}> Book Now </button>
            </span>

            
            
                </ul>
           
          
        </div>
        ))}
        
      </div>

    </>
    

  );
}

export default memo(DisplayFlight);
