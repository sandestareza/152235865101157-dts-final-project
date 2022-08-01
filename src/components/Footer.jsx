import React from 'react'
import {BsReceipt} from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="flex justify-between items-center p-4 bg-slate-800 text-white">
            <div className="flex items-center">
                <BsReceipt className='text-3xl mr-1'/>
                <p className='text-2xl font-bold uppercase'>Resep App</p>
            </div> 
            <div className="flex items-center">
                <p>Copyright © 2022 - Sandesta Reza</p>
            </div>
        </footer>

    )
}

export default Footer