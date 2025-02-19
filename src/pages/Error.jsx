import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
            <Helmet>
                <title>TechNest | Error</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
            <p className="text-lg mt-2 text-black">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-900">{error?.statusText || error?.message}</p>
            <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go Home</Link>
        </div>
    );
};

export default Error;
