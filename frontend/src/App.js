import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import Food from './components/Food'

const App = () => {
  const [image, setImage] = useState(null)
  const [user, setUser] = useState('')
  const [actualUserObj, setActualUserObj] = useState({})
  const [users, setUsers] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [newFriend, setNewFriend] = useState(false)
  const [fText, setFText] = useState('')
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

  // Add food to user list
  const addF = async() => {
    try {
      const { _id } = actualUserObj
      const { data } = await axios.put('/api/add', { _id, food: image })
      if (data === 'Food added') {
        window.alert('Food added!')
      }
      fetch('https://foodish-api.herokuapp.com/api/')
        .then(res => res.json())
        .then(({ image }) => {
          setImage(image)
        })
    } catch (err) {
      window.alert('Error: addF')
    }
  }
  
  // adds Friend to user list
  const addFriend = async() => {
    try {
      const { _id } = actualUserObj
      const { data } = await axios.put('/api/friend', { _id, friend: fText })
      setNewFriend(false)
      setFText('')
      if (data === 'Friend added') {
        window.alert('Friend added!')
      } else {
        window.alert('Error: no user with that username!')
      }
    } catch (err) {
      window.alert('Error: addFriend')
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
            <Col><h1>Foodstagram!!</h1></Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
              {loggedIn ? (
                <div>
                  <h5>Hi, {user}! <Link onClick={logout} to="logout">Logout</Link></h5>
                  <button
                    type="button"
                    className="btn btn-danger hover"
                    onClick={() => deleteUser()}
                  >
                    Delete account!
                  </button>

                  <br />
                  {/* add a new friend */}
                  <button
                    type="button"
                    className="btn mx-1 btn-primary hover"
                    onClick={() => setNewFriend(true)}
                  >
                    Add Friend!
                  </button>

                  {newFriend && (
                    <div className="card">
                      <h4> New Friend: </h4>
                      <input
                        onChange={e => setFText(e.target.value)}
                        placeholder="Write new friend username here"
                      />
                      <br />
                      <button
                        type="button"
                        className="btn mx-1 btn-warning hover"
                        onClick={() => addFriend()}
                      >
                        Submit Friend Request!
                      </button>
                      <button
                        type="button"
                        className="btn mx-1 btn-dark hover"
                        onClick={() => setNewFriend(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                ) : (
                  <Button onClick={() => navigate('/login')}> Log in to see awesome sauce! </Button>
              )}
            </Col>
          </Row>
          <div>
            {loggedIn && (
              <div>
                { image != null ? (
                  <div>
                    <Row style={{ marginTop: '1rem' }}>
                      <Col style={{display: 'flex', justifyContent: 'center'}}>
                        <Image style={{ maxWidth: '300px', maxHeight:'300px' }} src={image} fluid/>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '1rem' }}>
                      <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
                        <Button variant="info" className="btn" onClick={() => addF()}> Fav! 🤩</Button>
                      </Col>
                      <Col>
                        <Button variant="info" className="btn" onClick={() => {
                          fetch('https://foodish-api.herokuapp.com/api/')
                            .then(res => res.json())
                            .then(({ image }) => {
                              setImage(image)
                            })
                        }}>
                          nah, next!
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <Row>
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
                  </Row>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
      <div>
        <Container style={{ padding: '1rem' }}>
            <h3>Users and their favorite food!</h3>
            {users.map(u => (
              <Card key={u._id} style={{ marginBottom: '1rem' }}>
                <Card.Body>
                  <Card.Title>
                    {u.username}
                    &apos;s
                    {' '}
                    picks:
                  </Card.Title>
                  <Container>
                    <Row>
                      {u.foods.map((f, id) => (
                          <Col sm={3}>
                            <Food id={id} foodImg={f} foodName={getFoodRegex(f)} />
                          </Col>
                      ))}
                    </Row>
                  </Container>
                  {u.foods.length === 0 && <p> No favorite foods :( </p>}
                </Card.Body>
              </Card>
            ))}
          </Container>
      </div>
    </div>
  )
}

export default App
