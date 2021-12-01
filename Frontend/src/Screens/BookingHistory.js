import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import AdminNav from '../Components/Navbar'

function BookingHistory() {
    return (
        <>
        <AdminNav />
         <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="pastjourney" title="Past Flights">
        <div style={{
            padding: '1.5rem',
        }}>
         <ul >
             <li style={{
             width: '90%',
             padding: '2rem 1.5rem',
             border: '2px solid #eee',
             boxShadow: '1px 2.2px 9.5px grey',
             background: 'beige',
             listStyle: 'none',
             margin: '10px auto',
             borderRadius: '5px'
         }}>Flight Number:</li>
         <li style={{
             width: '90%',
             padding: '2rem 1.5rem',
             border: '2px solid #eee',
             boxShadow: '1px 2.2px 9.5px grey',
             background: 'beige',
             listStyle: 'none',
             margin: '10px auto'
         }}>Flight Number:</li>
             
             
             </ul>  
         </div>
        </Tab>
        <Tab eventKey="upcomingflights" title="Upcoming Flights">
            
        </Tab>
        </Tabs>   
        </>
    )
}

export default BookingHistory
