import './App.css'
import Login from './components/login/login'
import SignUp from './components/signup/SignUp'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
      <h1>tskManager</h1>

      <RouterProvider router={router} />

      <p className="info">
        ur one and only task manager :)
      </p>
    </>
  )
}

export default App
