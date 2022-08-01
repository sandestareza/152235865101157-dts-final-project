import React from 'react'
import { useGetDetailReceipesQuery } from '../../services/recipesApi.js'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Layout from '../../components/Layout.jsx';
import LoadingPage from '../../components/LoadingPage.jsx';
import CardItem from '../../components/CardItem.jsx';


const Detail = () => {

    const { key } = useParams();

    const {data, isLoading, error} = useGetDetailReceipesQuery(key)    
    
    return (
        <div>
            <Navbar/>
            <Layout>
                {
                    isLoading ? <LoadingPage/> :
                    error ? <div>{error.message}</div> :
                    data && data.results &&
                    <CardItem data={data.results}/>

                }
            </Layout>
        </div>
    )
}

export default Detail