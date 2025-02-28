import { createHashRouter } from 'react-router-dom'
import { path } from '~/constants/path'
import AuthLayout from '~/layouts/AuthLayout'
import BaseLayout from '~/layouts/BaseLayout'
import ChooseCharacters from '~/pages/ChooseCharacters'
import Home from '~/pages/Home'
import NameCharacters from '~/pages/NameCharacters'
import Register from '~/pages/Register'
import Welcome from '~/pages/Welcome'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import Login from '~/pages/Login'

export const routers = createHashRouter([
  {
    element: <PublicRouter />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Welcome />
          },
          {
            path: path.welcome,
            element: <Welcome />
          },
          {
            path: path.login,
            element: <Login />
          },
          {
            path: path.register,
            element: <Register />
          }
        ]
      },
      {
        element: <BaseLayout />,
        children: [
          {
            path: path.chooseCharacters,
            element: <ChooseCharacters />
          },
          {
            path: path.nameCharacters,
            element: <NameCharacters />
          }
        ]
      }
    ]
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <BaseLayout />,
        children: [
          {
            path: path.home,
            element: <Home />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Home />
  }
])
