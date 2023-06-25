import './App.css'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import MyCalendar from './components/calendar/MyCalendar'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChangePassword from './components/changepassword/ChangePassword'
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

  // correct routing for deployment purpose
  const isNetlify = process.env.NODE_ENV === 'production'
  const basename = isNetlify ? '/frontend' : '/'

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
      path: '/calendar',
      element: <MyCalendar token={token}/>,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    }
  ], { basename })

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
