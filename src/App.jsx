import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import './App.css'
export default function App() {
  const navigate = useNavigate();
  const userData = useSelector((state => state.auth.userData));
  useEffect(() => {
    if (userData) {
      navigate('/posts');
    } else {
      navigate('/login')
    }
  }, [userData])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

;
// background: rgb(221, 51, 92);
// background: ;