import React from 'react'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <div className='w-full h-full'>
				<div className='mx-10 my-7'>
                    {children}
                </div>                
                <Footer/>
        </div>  
    )
}

export default Layout