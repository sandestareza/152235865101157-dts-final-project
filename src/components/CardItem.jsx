import React from 'react'
import {FaRegCalendarAlt, FaUserAlt} from 'react-icons/fa'
import BreadCrump from './BreadCrump'

const CardItem = ({data}) => {
    return (
        <>  
            <BreadCrump title={data.title} page="Detail"/>          
            <div className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover rounded-lg" style={{backgroundImage: `url("${data.thumb}")`, height: '400px'}}>
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                    <div className="flex justify-center items-center h-full">
                    <div className="text-white">
                        <h2 className="font-semibold text-4xl mb-4">{data.title}</h2>
                        <p className="text-white text-base">
                            <span className="inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">                        
                                <FaUserAlt className="mr-1 text-md"/>
                                {data.author.user}
                            </span>
                            <span className="inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">                        
                                <FaRegCalendarAlt className="mr-1 text-md"/>
                                {data.author.datePublished}
                            </span>                        
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <div className="block p-6 rounded-lg border bg-white w-full">
                    <h5 className="text-gray-900 text-sm leading-tight font-medium mb-8">
                        <span className="inline-flex items-center justify-center px-2 py-2 mr-2 mb-2 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full">                        
                            Tingkat kesulitan:  {data.dificulty}
                        </span>
                        <span className="inline-flex items-center justify-center px-2 py-2 mr-2 mb-2 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full">
                            Durasi:  {data.times}
                        </span>
                    </h5>
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                        Deskripsi
                    </h5>
                    <p className="text-gray-700 text-base mb-4 text-justify">
                        {data.desc}
                    </p>
                </div>
            </div>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mt-8">
                Bahan-bahan
            </h5>
            <ol className="border-l border-gray-300 mt-2">
                {
                    data.ingredient.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="flex flex-start items-center pt-3">
                                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                                    <p className="text-black text-sm">{item}</p>
                                </div>
                            </li>                            
                        )
                    })
                }
            </ol>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mt-8">
                Cara Membuat
            </h5>
            <ol className="border-l border-gray-300 mt-2">
                {
                    data.step.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="flex flex-start items-center pt-3">
                                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                                    <p className="text-black text-sm">{item}</p>
                                </div>
                            </li>                            
                        )
                    })
                }
            </ol>
        </>
    )
}

export default CardItem