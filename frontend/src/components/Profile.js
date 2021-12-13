import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import AddFriends from './AddFriends'
import AddFood from './AddFood'
import Foods from './Foods'

const Profile = ({ loggedIn, actualUserObj, setActualUserObj, setUser, setLoggedIn }) => {
  const [newFriend, setNewFriend] = useState(false)
  const [fText, setFText] = useState('')
  const navigate = useNavigate()

  // const getU = async () => {
  //   try {
  //     const { data } = await axios.get('/account/check')
  //     if (data !== 'user not logged in') {
  //       setActualUserObj(data)
  //       console.log(data)
  //     }
  //   } catch (err) {
  //     alert('error with getting current user')
  //   }
  // }

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

      <Container style={{ padding: '1rem' }}>
        <Card key={actualUserObj._id} style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>
              {actualUserObj.username}
              &apos;s
              {' '}
              picks:
            </Card.Title>
            <Container>
                <Foods u_id={actualUserObj._id} foods={actualUserObj.foods} />
            </Container>
            {actualUserObj.foods.length === 0 && <p> No favorite foods :( </p>}
            <h4>
              {actualUserObj.username}
              &apos;s
              {' '}
              Friends:
            </h4>
            {actualUserObj.friends.map(f => (
              <div key={uuidv4()}>
                <p className="card-text">
                  •
                  {' '}
                  {f}
                </p>
              </div>
            ))}
            {actualUserObj.friends.length === 0 && <p> No friends :( </p>}
          </Card.Body>
        </Card>
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
