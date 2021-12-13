import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import AddFriends from './AddFriends'
import AddFood from './AddFood'

const Profile = ({ loggedIn, actualUserObj }) => {
  const [newFriend, setNewFriend] = useState(false)
  const [fText, setFText] = useState('')
  
  return (
    <div>
      { /* add a new friend */
        newFriend ? (
          <AddFriends setNewFriend={() => setNewFriend(false)} fText={fText} setFText={setFText} actualUserObj={actualUserObj}/>
        ) : (
          <div>
            <Button className="btn mx-1 btn-primary hover" onClick={() => setNewFriend(true)}>Add Friend!</Button>
            <Button className="btn btn-danger hover" onClick={() => deleteUser()}>Delete account!</Button>
          </div>
        )
      }

      <AddFood loggedIn={loggedIn} actualUserObj={actualUserObj}/>
    </div>
  )
}

export default Profile
