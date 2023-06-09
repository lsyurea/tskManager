import './App.css'
import Login from './components/login/login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChangePassword from './components/login/ChangePassword'
import { useState, useEffect } from 'react'

function App() {
  // token is globally accessible
  const [token, setToken] = useState(null);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(JSON.parse(sessionStorage.getItem('token')));
    }
  },[])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home token={token}/>,
    },
    {
      path: '/login',
      element: <Login setToken={setToken}/>,
    },
    {
      path: '/changePassword',
      element: <ChangePassword />,
    },
    {
      path: '/dashboard',
      element: <DashBoard token={token}/>,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    }
  ])

  return (
    <>
      <div className="window">
        <Navbar token={token}/>
        {/* <h1>tskManager</h1> */}

        <RouterProvider className="card" router={router} />

        {/* <p className="info">
          ur one and only task manager :)
        </p> */}
      </div>
    </>
  )
}

export default App
