import React from 'react'
import { useParams } from 'react-router-dom'
import CardList from '../../components/CardList'
import Layout from '../../components/Layout'
import LoadingPage from '../../components/LoadingPage'
import Navbar from '../../components/Navbar'
import BreadCrump from '../../components/BreadCrump'
import { useSearchQuery } from '../../services/recipesApi'
import Alert from '../../components/Alert'

const Search = () => {

    const {key} = useParams()

    const {data, isLoading, error } = useSearchQuery(key)

    return (
        <div>
            <Navbar/>
            <Layout>
                <BreadCrump title={key} page="Search"/>
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
                            data.results.length ? 
                            data.results.map((item, index) => (
                                <CardList key={index} item={item}/>
                            ))

                            :
                            <Alert title="info">
                                <p>Kata <span className='font-bold'>{key}</span> yang dicari tidak ditemukan!</p>
                            </Alert>
                        )
                    }
                    </div>
            </Layout>
        </div>
    )
}

export default Search