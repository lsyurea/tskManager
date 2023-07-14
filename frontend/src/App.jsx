import './App.css'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Module from './components/module/Module'
import MyCalendar from './components/calendar/MyCalendar'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChangePassword from './components/changepassword/ChangePassword'
import { useEffect, useState } from 'react'
import { fetchTodo, fetchCalendarEvent, fetchModule } from './services/apiService'

function App() {


  // correct routing for deployment purpose
  const basename = '/'

  const [token, setToken] = useState(null)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
    Promise.all([fetchTodo(), fetchCalendarEvent() , fetchModule()])
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = JSON.parse(sessionStorage.getItem('token'))
      setToken(token)}
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
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
      element: <DashBoard/>,
    },
    {
      path: '/calendar',
      element: <MyCalendar/>,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/module',
      element: <Module />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    }
  ], { basename })

  return (
    <>
      <div className="window">
        <Navbar className="bar" />
        <div className='card'></div>
        <RouterProvider router={router} />

      
      </div>
    </>
  )
}

export default App
