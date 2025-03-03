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
import {AnsweredFormPage} from './components/AnsweredFormPage/AnsweredFormPage.jsx'


function ProtectedRoute({children}) {
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
            return;
        }

    }, []);

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
    },    {
        path: '/FormsPage/:formId',
        element: (
            <ProtectedRoute>
                <FormsPage/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },{
        path: '/AnsweredFormPage/:formId',
        element: (
            <ProtectedRoute>
                <AnsweredFormPage/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage/>
    },
    {
        path: '/NewFormsPage/:formId?',
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
