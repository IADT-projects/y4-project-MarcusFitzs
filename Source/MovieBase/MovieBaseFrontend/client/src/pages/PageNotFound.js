import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';

const PageNotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Rediect to homepage
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => {
            clearTimeout(timer)
        }
    });

    return (
        <>
            <h2>Page not found: {location.pathname}</h2>
            <p>Redirecting you to Home</p>
        </>
    );
};

export default PageNotFound;