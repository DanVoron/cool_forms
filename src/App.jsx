import {useEffect, useState} from 'react';
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from 'react-router-dom';

import {LoginPage} from './components/LoginPage/LoginPage.jsx';
import {MainPage} from './components/MainPage/MainPage.jsx';
import {ProfilePage} from './components/ProfilePage/ProfilePage.jsx';
import {FormsPage} from './components/FormsPage/FormsPage.jsx';
import {ErrorPage} from './components/ErrorPage/ErrorPage.jsx';
import {NewFormsPage} from './components/NewFormsPage/NewFormsPage.jsx'

function ProtectedRoute({children}) {
    // const {auth, setAuth, setIsHolop, isHolop} = useContext(LoginContext);
    // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     if (!token) {
    //         navigate('/');
    //         return;
    //     }
    //
    // }, [auth, navigate, setAuth, setIsHolop]);
    //
    // const userDataString = localStorage.getItem('userData');
    // const userData = JSON.parse(userDataString);
    //
    // if(userData.role == `Admin`){
    //     setIsHolop(false)
    // }
    // else if (userData.role == 'User'){
    //     setIsHolop(true)
    // }
    //
    // if (isHolop === true && window.location.pathname !== '/user') {
    //     navigate('/user');
    // } else if (isHolop === false && window.location.pathname !== '/admin') {
    //     navigate('/admin');
    // }
    return children;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/MainPage',
        element: (
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },
    {
        path: '/Profile',
        element: (
            <ProtectedRoute>
                <ProfilePage/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },{
        path: '/FormsPage',
        element: (
            <ProtectedRoute>
                <FormsPage/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },{
        path: '/NewFormsPage',
        element: (
            <ProtectedRoute>
                <NewFormsPage/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },
]);

function App() {

  return (
    <>
                <RouterProvider router={router}/>
    </>
  )
}

export default App
