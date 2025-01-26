import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TechNest | Home</title>
            </Helmet>
            <h1 className='text-5xl text-center py-10'>Home</h1>
        </div>
    );
};

export default Home;