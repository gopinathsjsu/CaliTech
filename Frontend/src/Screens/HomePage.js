import React from 'react'
import AdminNav from '../Components/Navbar'
import Particle from '../Components/Particle'
import images from '../images/flight.jpg' 

// console.log("hello" + {url})

function HomePage() {
    return (
        <>
        
            {/* <Particle /> */}
            <AdminNav/>
            
            <h2> Save more on your travel this Festive Season!</h2>
            <img src={images} width ="100%"  height ="50%" styles={{overflow:"hidden"}}></img>

            
            {/* <div
            className="imagemain"
            style={{ */}
                {/* // background: `url(${url})`,
                // background: `url(${url}) no-repeat center center fixed` */}
              
                {/* }}>
                </div> */}
                {/* <div class="overlay"
                style={{width: '100%',
                    height: '100%',
                    padding: '50p',
                    color: '#fff',
                    textshadow: '1px 1px 1px #333'}}>

                    
                
                    </div> */}
        </>
    )
    
}

export default HomePage
