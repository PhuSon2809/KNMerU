import { createHashRouter } from 'react-router-dom'
import { path } from '~/constants/path'
import AuthLayout from '~/layouts/AuthLayout'
import BaseLayout from '~/layouts/BaseLayout'
import ChooseCharacters from '~/pages/ChooseCharacters'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import NameCharacters from '~/pages/NameCharacters'
import Register from '~/pages/Register'
import Welcome from '~/pages/Welcome'

export const routers = createHashRouter([
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
        path: path.home,
        element: <Home />
      },
      {
        path: path.chooseCharacters,
        element: <ChooseCharacters />
      },
      {
        path: path.nameCharacters,
        element: <NameCharacters />
      }
    ]
  },
  {
    path: '*',
    element: <Home />
  }
])
