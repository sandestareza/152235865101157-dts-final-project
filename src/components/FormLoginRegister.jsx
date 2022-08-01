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

import { FcGoogle } from 'react-icons/fc';
import {FaFacebookSquare} from 'react-icons/fa';

function FormLoginRegister({title}) {
	const [user, isLoading] = useAuthState(auth);
	const navigate = useNavigate();


	const [credential, setCredential] = useState({
		email: "",
		password: "",
		fullname: "",
	});

  	const [errorMessage, setErrorMessage] = useState(null);

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
					<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone image" />
				</div>
				<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
					<h1 className='text-center mb-8 text-xl'>Selamat datang di Aplikasi <br/><span className='font-bold text-3xl uppercase bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-violet-600'>Resep App</span> </h1>
					{
						errorMessage?.msg && (
							<div className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
								</svg>
								{errorMessage?.msg}
							</div>
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
					<div className="mb-6">
						<input type="password" className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${errorMessage?.passwordError && 'border-red-500 focus:border-red-700'}`} placeholder="Password"
						onChange={handleChangePassword}
						/>
						{errorMessage?.passwordError && (<span className='text-red-500'>{errorMessage?.passwordError}</span>)}
					</div>
					{
						title === 'Sign In' && (
							<div className="flex justify-end items-center mb-6">						
								<a className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">Forgot password?</a>
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
								<button type='button' onClick={signInWithGoogle} className="px-7 py-3 text-slate-800 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" style={{backgroundColor: '#fff'}} role="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
									<FcGoogle className='mr-2 text-xl'/>Continue with Google
								</button>	
								<button type='button' onClick={signInWithFacebook} className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3" style={{backgroundColor: '#3b5998'}} role="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
								<FaFacebookSquare className='mr-2 text-xl'/>Continue with Facebook
								</button>	
							</>
						)
					}
					{
						title === 'Sign In' ? 
							<p className="text-sm font-semibold mt-2 pt-1 mb-0">
							Don't have an account?
							<Link to="/register">
								<a className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2">Register</a>
							</Link>
							</p>
						:
							<p className="text-sm font-semibold mt-2 pt-1 mb-0">
							 Already have an account?
							 <Link to="/login">
								<a className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition duration-200 ease-in-out ml-2">Login</a>
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