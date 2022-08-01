import React, { useEffect } from 'react'
import { useGetDetailReceipesQuery } from '../../services/recipesApi.js'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import Layout from '../../components/Layout.jsx';
import LoadingPage from '../../components/LoadingPage.jsx';
import CardItem from '../../components/CardItem.jsx';

import { auth } from '../../auth/firebase.js';


const Detail = () => {

    const { key } = useParams();
    const navigate = useNavigate();

    const {data, isLoading, error} = useGetDetailReceipesQuery(key)

    useEffect(() => {
        if(!auth.currentUser) {
            navigate('/login')
        }

    }, [])
    
    
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