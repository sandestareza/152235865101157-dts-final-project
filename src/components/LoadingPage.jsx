import React from 'react'

const LoadingPage = () => {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" style={{top:"50%"}}> 
                    <span className="visually-hidden">
                        <svg
                            className="animate-spin h-24 w-h-24 text-green-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <circle
                                className="opacity-25"
                                cx={12}
                                cy={12}
                                r={10}
                                stroke="currentColor"
                                strokeWidth={4}
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </span>
            </span>
        </div>
    )
}

export default LoadingPage