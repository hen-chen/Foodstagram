import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'

const App = () => {
  const [image, setImage] = useState(null)
  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(async () => {
    try {
      const { data } = await axios.get('/account/check')
      if (data !== 'user not logged in') {
        setUser(data)
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

  return (
    <div>
      <Container style={{ margin: '1rem' }}>
        <Row>
          <Col><h1>Foodstagram!</h1></Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
            {loggedIn ? (
                <div>
                  <h5>Hi, {user}! <Link onClick={logout} to="logout">Logout</Link></h5>
                </div>
              ) : (
                <Button onClick={e => navigate('/login')}> Log in to for insider food image </Button>
            )}
          </Col>
        </Row>
        <Row>
          {loggedIn && (
            <div>
              <Col>
                <Button className="btn" onClick={() => {
                  fetch('https://foodish-api.herokuapp.com/api/')
                    .then(res => res.json())
                    .then(({ image }) => {
                      setImage(image)
                    })
                }}>
                  Load food image!
                </Button>
              </Col>
              <Col style={{ marginTop: '1rem', width: '50rem' }}><Image src={image} fluid/></Col>
            </div>
          )}
        </Row>
      </Container>
    </div>
  )
}
export default App
