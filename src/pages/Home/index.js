import React from 'react'
import { useGetRecipesQuery } from '../../services/recipesApi.js'
import Navbar from '../../components/Navbar';
import CardList from '../../components/CardList.jsx';
import Layout from '../../components/Layout.jsx';
import LoadingPage from '../../components/LoadingPage.jsx';
import FormSearch from '../../components/FormSearch.jsx';


const Home = () => {

	const { data, error, isLoading } = useGetRecipesQuery()


	
	

    return (
		<>
			<Navbar/>
			<Layout>
				<h1 className='font-bold text-center text-2xl'>Mau masak apa hari ini?</h1>
				<FormSearch/>
				<div className='flex md:flex-row flex-col flex-wrap justify-center gap-4 mt-4'>
					{
						isLoading ? (
							<LoadingPage/>
						) :
						error ? (
							<div className='text-center'>
								<h1 className='text-red-500'>{error}</h1>
							</div>
						) : (
							data.results.map((item, index) => (
								<CardList key={index} item={item}/>						
							))
						)
					}
				</div>
			</Layout>

		</>
    )
}

export default Home