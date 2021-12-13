import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import AddFriends from './AddFriends'
import AddFood from './AddFood'
import Foods from './Foods'

const Profile = ({ loggedIn, actualUserObj, setActualUserObj, setUser, setLoggedIn, users }) => {
  const [newFriend, setNewFriend] = useState(false)
  const [fText, setFText] = useState('')
  const navigate = useNavigate()

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
      <Container style={{ padding: '1rem' }}>
        <Row>
          <Col><AddFood loggedIn={loggedIn} actualUserObj={actualUserObj} setActualUserObj={setActualUserObj}/></Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>{ /* add a new friend */
            newFriend ? (
              <AddFriends setNewFriend={() => setNewFriend(false)} fText={fText} setFText={setFText} actualUserObj={actualUserObj}/>
            ) : (
              <div>
                <Button className="btn mx-1 btn-primary hover" onClick={() => setNewFriend(true)}>Add Friend!</Button>
              </div>
            )
          }</Col>
        </Row>
      </Container>

      <Container>
        {users.map(u => (
          actualUserObj.username === u.username ? (
            <Card key={u._id} style={{ marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title style={{ fontFamily: "Americana" }}>
                  {u.username}
                  &apos;s
                  {' '}
                  picks:
                </Card.Title>
                <Container>
                    <Foods u_id={u._id} foods={u.foods} />
                </Container>
                {u.foods.length === 0 && <p style={{ fontFamily: "Americana" }}> No favorite foods :( </p>}
                <h4 style={{ fontFamily: "Americana" }}>
                  {u.username}
                  &apos;s
                  {' '}
                  Friends:
                </h4>
                {u.friends.map(f => (
                  <div key={uuidv4()}>
                    <p style={{ fontFamily: "Americana" }} className="card-text">
                      •
                      {' '}
                      {f}
                    </p>
                  </div>
                ))}
                {u.friends.length === 0 && <p style={{ fontFamily: "Americana" }}> No friends :( </p>}
              </Card.Body>
            </Card>
          ) : null
        ))}
      </Container>

      <Container>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
            <Link onClick={logout} to="logout">Logout</Link>
            <Button style={{ marginLeft: '1rem'}}className="btn btn-danger hover" onClick={() => deleteUser()}>Delete account!</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
