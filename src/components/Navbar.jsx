import React, {useState} from 'react'
import { signOutApp, auth } from '../auth/firebase';
import { Link, useNavigate } from 'react-router-dom';
import {BsReceipt} from 'react-icons/bs'

import {useGetKategoriQuery} from '../services/recipesApi'


const Navbar = () => {

    const [navbar, setNavbar] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const [kategoris, setKategoris] = useState(false);

    const navigate = useNavigate();

    const {data} = useGetKategoriQuery();

    const logoutHandler = async () => {
        await signOutApp();
        navigate("/login");
    }

    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to="/">
                            <div className='flex items-center'>
                                <BsReceipt className='text-3xl mr-1 text-violet-600'/>
                                <h2 className="text-2xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-violet-600">Resep App</h2>
                            </div>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center text-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-700 hover:font-bold">
                                <button onClick={()=>setKategoris(!kategoris)} type="button" className='inline-flex justify-center w-full'>
                                    Kategori
                                    <svg className="-mr-1 mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {
                                    kategoris && (
                                        <div id="dropdown" className="absolute top-14 z-10 w-40 bg-white rounded divide-y divide-gray-100 shadow">
                                            <ul className="py-1 text-sm text-left text-gray-700" aria-labelledby="dropdownDefault">
                                                {
                                                    data && data.results.map((item, i) => (
                                                        <li key={i}>
                                                            <Link to={`/kategori/${item.key}`} className="block py-2 px-4 hover:bg-gray-100 hover:font-normal">{item.category}</Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>                          
                                    )
                                }
                            </li>
                            <li className="text-gray-600 hover:text-blue-700 hover:font-bold">
                                <p>Artikel</p>
                            </li>
                            <li className="text-gray-600 hover:text-blue-700 hover:font-bold">
                                {
                                    auth.currentUser ? 
                                    <button onClick={()=>setDropDown(!dropDown)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {auth.currentUser ? auth.currentUser.displayName : ""}
                                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    :
                                    <div className='flex'>
                                        <Link to="/login">
                                            <button type="button" className="inline-flex justify-center mr-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                                Login
                                            </button>
                                        </Link>
                                        <Link to="/register">
                                            <button type="button" className="inline-flex justify-center ml-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                                Register
                                            </button>
                                        </Link>
                                    </div>
                                }
                                {
                                    dropDown && (
                                        <div className="origin-top-right absolute right-0 mt-2 md:w-56 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                            <div className="py-1">
                                                <button onClick={logoutHandler} type="button" className="text-gray-700 block w-full md:text-left px-4 py-2 text-sm" tabIndex={-1} id="menu-item-3">
                                                    Sign out
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar