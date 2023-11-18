import { Navigate, useRoutes } from 'react-router-dom'
import SignIn from './components/SignIn'
import Images from './components/Images'
import ProtectedRoute from './layouts/ProtectedRoute'
import Layout from './layouts/Layout'
import {useSelector} from "react-redux"

interface IUser {
  user: {
    user: {
      name: string
      id: number
    }
  }
}

function Routes() {
  const user = useSelector((state: IUser) => state.user.user)
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to='login' /> },
        {
          path: 'login',
          element: <SignIn/>
        },
        {
          path: 'images',
          element: (
            <ProtectedRoute isAllowed={!!user.name}>
              <Images />
            </ProtectedRoute>
          )
        }
      ]
    },
  ])
}

export default Routes