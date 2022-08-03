import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { forgetPassword } from '../../auth/firebase'
import Alert from '../../components/Alert'

const LupaPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [timeLeft, setTimeLeft] = useState(null);

    const navigate = useNavigate()

    const handleForgetPassword = async (e) => {
        e.preventDefault()

        const response = await forgetPassword(email)
        if (response.status === 400) {
            setEmail('')
            setError(response.err.message)
        } else {
            setTimeLeft(5)
            setSuccess(response.message)
            setEmail('')
            setError('')

        }
           
    }
    useEffect(() => {
        if(timeLeft===0){
           setTimeLeft(null)
           navigate('/login')
        }
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
    
          setTimeLeft(timeLeft - 1);
          
        }, 1000);
    
        return () => {clearInterval(intervalId)
        };

      }, [timeLeft, navigate]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">Lupa Password?</h3>
                    <p className="mb-4 text-sm text-gray-700">
                        Cukup masukkan alamat email Anda di bawah ini dan kami akan mengirimkan Anda
                        tautan untuk mengatur ulang kata sandi Anda!
                    </p>
                    </div>
                    {
                        error &&
                        <Alert title="error">{error}</Alert>
                    }
                    {
                        success &&
                        <Alert title="success">{success} redirect halaman login dalam <span className='text-center font-bold'> {timeLeft} </span>detik</Alert>
                    }
                    <form onSubmit={handleForgetPassword} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                        </label>
                        <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Masukkan alamat email..." />
                    </div>
                    <div className="mb-6 text-center">
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-full hover:to-blue-600 focus:outline-none focus:shadow-outline">
                        Reset Password
                        </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">							
							<Link to="/register">
								<span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2 hover:cursor-pointer hover:underline">Belum punya akun? Daftar</span>
							</Link>
						</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">							 
							 <Link to="/login">
								<span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2 hover:cursor-pointer hover:underline">Sudah punya akun? Masuk</span>
							 </Link>
						</p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default LupaPassword