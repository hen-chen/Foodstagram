import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'

const App = () => {
  const [image, setImage] = useState(null)
  const [user, setUser] = useState('')
  const [actualUserObj, setActualUserObj] = useState({})
  const [users, setUsers] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const listU = async () => {
    try {
      const { data } = await axios.get('/api/users')
      setUsers(data)
    } catch (err) {
      window.alert('Error: listU')
    }
  }

  // Add food to user list // TODO
  const addF = async() => {
    try {
      const { _id } = actualUserObj
      const { data } = await axios.post('/api/add', { _id, food: image })
      if (data === 'Food added') {
        console.log(image)
        console.log(_id)
        window.alert('Food added!')
      }
    } catch (err) {
      window.alert('Error: addF')
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
        console.log(data)
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
      <Container style={{ margin: '1rem' }}>
        <Row>
          <Col><h1>Foodstagram!!</h1></Col>
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
              <Col style={{ marginTop: '1rem', width: '50rem' }}> 
              <Image style={{ maxWidth: '300px', maxHeight:'300px' }} src={image} fluid/>
              <br />
              <button
                style={{ width: "100px", height:"60px" }}
                className="btn btn-success hover"
                onClick={() => addF()}
              >
                👍 Fav!
              </button>
              </Col>
            </div>
          )}
          <br />
          <hr />
          <div className="container"> 
            <h3>Users and their favorite food!</h3>
            {users.map(u => (
              <div key={u._id} className="card">
                <h4>
                  {u.username}
                  &apos;s
                  {' '}
                  picks:
                </h4>
                {u.foods.map(f => (
                  <div key={uuidv4()}>
                    <p className="card-text">
                      •
                      {' '}
                      <a href={f} target="_">
                        {getFoodRegex(f)}
                      </a>
                    </p>
                  </div>
                ))}
                {u.foods.length === 0 && <p> No favorite foods :( </p>}
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default App
