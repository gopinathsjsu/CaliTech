import React from 'react'
import AdminNav from '../Components/Navbar'
import Particle from '../Components/Particle'
import url from '../image/home__.png'

console.log("hello" + {url})

function HomePage() {
    return (
        <>
        
            {/* <Particle /> */}
            <AdminNav trigger/>
            
            <h2> Save more on your travel this Festive Season!</h2>
            

            
            <div
            className="imagemain"
            style={{
                // background: `url(${url})`,
                background: `url(${url}) no-repeat center center fixed`
              
                }}>
                </div>
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
