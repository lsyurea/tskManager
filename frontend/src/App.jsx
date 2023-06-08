import './App.css'
import Login from './components/login/login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import ChangePassword from './components/login/ChangePassword'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/changePassword',
    element: <ChangePassword />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
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

function App() {


  return (
    <>
      <div>
        <Navbar />
        {/* <h1>tskManager</h1> */}

        <RouterProvider router={router} />

        {/* <p className="info">
          ur one and only task manager :)
        </p> */}
      </div>
    </>
  )
}

export default App
