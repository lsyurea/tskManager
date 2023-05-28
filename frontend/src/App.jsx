import './App.css'
import Login from './components/login/login'
import DashBoard from './components/dashboard/Dashboard'
import ErrorPage from './components/ErrorPage'
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'

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
    path: '*',
    element: <ErrorPage />,
  }
])

function App() {


  return (
    <>
      <h1>tskManager</h1>

      <RouterProvider router={router} />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
