import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import MyBookings from './pages/MyBookings'
import MyHotels from './pages/MyHotels'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout>Home page</Layout>}/>
        <Route path='/register' element={<Layout><Register/></Layout>}/>
        <Route path='/sign-in' element={<Layout><SignIn/></Layout>}/>
        <Route path='/my-bookings' element={<Layout><MyBookings/></Layout>}/>
        <Route path='/my-hotels' element={<Layout><MyHotels/></Layout>}/>
      </Routes> 
    </Router>
  )
}

export default App