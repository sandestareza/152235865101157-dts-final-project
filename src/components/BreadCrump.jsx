import React from 'react'
import { Link } from 'react-router-dom'


const BreadCrump = ({title, page}) => {
    return (
        <div className="py-3 px-5 mb-4 bg-gray-100 text-gray-900 rounded-md text-sm border border-gray-200">
            <ul className="flex">
                <li><Link to="/" className="underline font-semibold">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li>{page}</li>
                <li><span className="mx-2">/</span></li>
                <li>{title}</li>
            </ul>
        </div>
    )
}

export default BreadCrump