import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Posts from './components/Posts.jsx'
import UserPost from './components/UserPost.jsx'
import Login from './components/Login.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'posts',
        element: <Posts />
      },
      {
        path: 'posts/:postId',
        element: <UserPost />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
  </React.StrictMode >,
)
