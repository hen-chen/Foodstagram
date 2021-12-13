import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import Home from './components/Home'
import Profile from './components/Profile'

const App = () => {
  const [user, setUser] = useState('')
  const [actualUserObj, setActualUserObj] = useState({})
  const [users, setUsers] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  // lists all users
  const listU = async () => {
    try {
      const { data } = await axios.get('/api/users')
      setUsers(data)
    } catch (err) {
      console.log(err)
    }
  }

  // deletes a user
  const deleteUser = async() => {
    try {
      const { _id } = actualUserObj
      const { data } = await axios.delete('/api/deleteUser', { data: { _id} })
      if (data === 'User deleted') {
        window.alert('User successfully deleted!')
        navigate('/login')
      }
    } catch (err) {
      window.alert('Error: deleteUser')
    }
  }

  // fetches Users every 2 seconds
  useEffect(async () => {
    listU()
    const intervalID = setInterval(() => {
      listU()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  useEffect(async () => {
    try {
      const { data } = await axios.get('/account/check')
      if (data !== 'user not logged in') {
        setUser(data.username)
        setActualUserObj(data)
        setLoggedIn(true)
      }
    } catch (err) {
      alert('error with getting current user')
    }
  }, [])

  useEffect(() => {
    if (user === '' || user === null) {
      setLoggedIn(false)
    }
  }, [user])

  const logout = async () => {
    try {
      const { data } = await axios.post('/account/logout', {})
      if (data === 'user is logged out') {
        setUser(null)
        setLoggedIn(false)
        navigate('/')
      }
    } catch (err) {
      alert('error with logout')
    }
  }

  const getFoodRegex = url => String(url).split('/')[4]

  return (
    <div>
      <div style={{ backgroundColor: '#efefef' }}>
        <Container style={{ padding: '1rem' }}>
          <Row>
            <Col sm={8}><h1>Foodstagram!!</h1></Col>
            <Col><h5>Home</h5></Col>
            <Col><h5>Profile</h5></Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
              {loggedIn ? (
                <div>
                  <h5>Hi, {user}! <Link onClick={logout} to="logout">Logout</Link></h5>
                </div>
                ) : (
                  <Button onClick={() => navigate('/login')}> Log in to see awesome sauce! </Button>
              )}
            </Col>
          </Row>
          <Profile loggedIn={loggedIn} actualUserObj={actualUserObj} />
        </Container>
      </div>
      <Home users={users} />
    </div>
  )
}

export default App
