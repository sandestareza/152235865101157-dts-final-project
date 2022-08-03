import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {
	auth,
	createUserApp,
	signInApp,
	signInWithFacebook,
	signInWithGoogle
} from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { FcGoogle, } from 'react-icons/fc';
import {FaFacebookSquare} from 'react-icons/fa';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'

import IconLogin from '../assets/img/loginIcon.svg'
import Alert from './Alert';

function FormLoginRegister({title}) {
	const [user, isLoading] = useAuthState(auth);
	const navigate = useNavigate();


	const [credential, setCredential] = useState({
		email: "",
		password: "",
		fullname: "",
	});

  	const [errorMessage, setErrorMessage] = useState(null);

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleChangeFullName = (e) => {
		setCredential({
			...credential,
			fullname: e.target.value
		});
		setErrorMessage({
			...errorMessage,
			fullnameError: null
		})
	}

	const handleChangeEmail = (e) => {
		setCredential({
		  ...credential,
		  email: e.target.value
		});
		setErrorMessage({
		  ...errorMessage,
		  emailError: null
		})
	}

	const handleChangePassword = (e) => {
		setCredential({
		  ...credential,
		  password: e.target.value
		});
		setErrorMessage({
		  ...errorMessage,
		  passwordError: null
		})
	}
	
	const loginHandler = () => {
		signInApp(credential.email, credential.password).then((response) => setErrorMessage({ ...errorMessage, msg: response?.message}))
	}

	const registerHandler = () => {
		createUserApp(credential.email, credential.password, credential.fullname).then((response) => console.log(response))
	}
	
	const validation = () => {
	
		let emailError = ''
		let passwordError = ''
		let fullnameError = ''
	
		if (!credential.email) emailError = 'Email is required'
	
		if (!credential.password) passwordError = 'Password is required'

		if(title === 'Sign Up' && !credential.fullname) fullnameError = 'Fullname is required'
	
		if (emailError || passwordError || fullnameError) {
			setErrorMessage({
				emailError,
				passwordError,
				fullnameError
			});
	
		 	 return false;
		}
	
		return true;
	
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validation();
		
		if (isValid) {
		  if (title === 'Sign In') {
			loginHandler();
		  } else {
			registerHandler();
		  }
		}
	
	}
	
	useEffect(() => {
	  
		  if (isLoading) {
			return;
		  }
		  if (user) {
			navigate("/");
		  }
	
	}, [user, isLoading, navigate]);


    return (
		<section className="h-screen">
			<div className="container px-6 py-12 h-full">
				<div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
				<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
					<img src={IconLogin} className="w-full" alt="Phoneimage" />
				</div>
				<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
					<h1 className='text-center mb-8 text-xl'>Selamat datang di Aplikasi <br/><span className='font-bold text-3xl uppercase bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-violet-600'>Resep App</span> </h1>
					{
						errorMessage?.msg && (
							<Alert>
								{errorMessage?.msg}
							</Alert>
						)
					}
					<form onSubmit={handleSubmit}>
					{
						title === 'Sign Up' && (
							<div className="mb-6">
								<input type="text" className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errorMessage?.fullnameError && 'border-red-500 focus:border-red-700'}`} placeholder="Full Name" 
								onChange={handleChangeFullName}
								/>
								{errorMessage?.fullnameError && (<span className='text-red-500'>{errorMessage?.fullnameError}</span>)}
							</div>
						)
					}
					{/* Email input */}
					<div className="mb-6">
						<input type="email" className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errorMessage?.emailError && 'border-red-500 focus:border-red-700'}`} placeholder="Email address"
						onChange={handleChangeEmail}
						/>
						{errorMessage?.emailError && (<span className='text-red-500'>{errorMessage?.emailError}</span>)}
					</div>
					{/* Password input */}
					<div className="mb-6 relative">
						<input type={showPassword ? "text" : "password"} className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errorMessage?.passwordError && 'border-red-500 focus:border-red-700'}`} placeholder="Password"
						onChange={handleChangePassword}
						/>
						{
							credential.password && (
								showPassword ? 
									<RiEyeLine className='absolute top-3 right-3 text-xl text-blue-800' onClick={handleShowPassword}/>
								:
									<RiEyeCloseLine className='absolute top-3 right-3 text-xl text-blue-800' onClick={handleShowPassword}/>
							)

						}
						{errorMessage?.passwordError && (<span className='text-red-500'>{errorMessage?.passwordError}</span>)}
					</div>
					{
						title === 'Sign In' && (
							<div className="flex justify-end items-center mb-6">		
								<Link to="/lupaPassword">
									<p className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out hover:cursor-pointer">Lupa password?</p>
								</Link>				
							</div>
						)
					}
					{/* Submit button */}
					<button type="submit" className="inline-block px-7 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light">
						{title}
					</button>
					{
						title === 'Sign In' && (
							<>
								<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
									<p className="text-center font-semibold mx-4 mb-0">OR</p>
								</div>
								<button type='button' onClick={signInWithGoogle} className="px-7 py-3 text-slate-800 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" style={{backgroundColor: '#fff'}}>
									<FcGoogle className='mr-2 text-xl'/>Masuk dengan Google
								</button>	
								<button type='button' onClick={signInWithFacebook} className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" style={{backgroundColor: '#3b5998'}}>
								<FaFacebookSquare className='mr-2 text-xl'/>Masuk dengan Facebook
								</button>	
							</>
						)
					}
					{
						title === 'Sign In' ? 
							<p className="text-sm font-semibold mt-2 pt-1 mb-0">
							Belum punya akun?
							<Link to="/register">
								<span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2 hover:cursor-pointer">Daftar</span>
							</Link>
							</p>
						:
							<p className="text-sm font-semibold mt-2 pt-1 mb-0">
							 Sudah punya akun?
							 <Link to="/login">
								<span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2 hover:cursor-pointer">Masuk</span>
							 </Link>
							</p>

					}
					</form>
				</div>
				</div>
			</div>
		</section>

    )
}

export default FormLoginRegister