import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import getWhoAmI from './api/requests/getWhoAmI';
import Routes from './Routes';
import { useDispatch } from "react-redux"
import { setUser } from './redux/userSlice';
import './App.css';



function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const token = localStorage.getItem("jwt") || sessionStorage.getItem('jwt')

  useEffect(() => {
    if (token) {
      getWhoAmI()
        .then((data) => {
          dispatch(setUser(data))
        })
        .finally(() => setLoading(false))
    } else setLoading(false)
  }, [])

  return (
  <div className="App">
    {loading ? (
      <div><CircularProgress size={100}/></div>
    ) : (
      <Routes/>
    )}
  </div>
  );
}

export default App;
