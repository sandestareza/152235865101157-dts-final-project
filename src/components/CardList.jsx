import React from 'react'
import { Link } from 'react-router-dom';

import {MdOutlineFastfood} from 'react-icons/md';
import {BiTimer} from 'react-icons/bi';
import {AiOutlineFileProtect} from 'react-icons/ai';


const CardList = ({item}) => {
    return (
        <div className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row md:max-w-md mt-10">
            <img src={item.thumb} className="object-cover w-full h-full rounded-t-lg md:w-48 md:rounded-none md:rounded-l-lg"/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 hover:text-blue-700">
                    <Link to={`/home/${item.key}`}>{item.title}</Link>
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                    {
                        !item.portion ? '' :
                        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">                        
                            <MdOutlineFastfood className="mr-1 text-xl"/>
                            {item.portion}
                        </span>
                    }
                    <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">                        
                        <BiTimer className="mr-1 text-xl"/>
                        {item.times}
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full md:mt-1">                        
                        <AiOutlineFileProtect className="mr-1 text-xl"/>
                        {item.dificulty}
                    </span>
                </p>
            </div>
        </div>	
    )
}

export default CardList