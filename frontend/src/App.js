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
  const [show, setShow] = useState('home')
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
    if (show === 'home') {
      document.getElementById('home').style.fontWeight = 'bold'
      document.getElementById('profile').style.fontWeight = 'normal'
    }

    if (show === 'profile') {
      document.getElementById('home').style.fontWeight = 'normal'
      document.getElementById('profile').style.fontWeight = 'bold'
    }
  }, [user, show])

  const getFoodRegex = url => String(url).split('/')[4]

  return (
    <div>
      <div style={{ backgroundColor: '#efefef' }}>
        <Container style={{ padding: '1rem' }}>
            {
              loggedIn ? (
                <Row>
                  <Col sm={8} style={{ fontFamily: "Snell Roundhand, cursive" }}><h1>Foodstagram!!</h1></Col>
                  <Col style={{ fontWeight: 'bold' }}><h5 id="home" onClick={() => setShow('home')} style={{ fontFamily: "Americana" }}>Home</h5></Col>
                  <Col><h5 id="profile" onClick={() => setShow('profile')} style={{ fontFamily: "Americana" }}>Profile</h5></Col>
                  <Col>
                    <h5 style={{ fontFamily: "Americana" }}>Hi, {user}!</h5>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col sm={6}><h1>Foodstagram!!</h1></Col>
                  <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}><Button onClick={() => navigate('/login')}> Log in to see awesome sauce! </Button></Col>
                  <h5 id="home"></h5><h5 id="profile"></h5>
                </Row>
              )
            }
        </Container>
      </div>
      {
        loggedIn ? (
          show == 'home' ? (
            <Home users={users} />
          ) : (
            <Profile loggedIn={loggedIn} actualUserObj={actualUserObj} setActualUserObj={setActualUserObj} setUser={setUser} setLoggedIn={setLoggedIn}/>
          )
        ) : null
      }
    </div>
  )
}

export default App
