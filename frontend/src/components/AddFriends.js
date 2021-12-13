import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

const AddFriends = ({ setNewFriend, fText, setFText, actualUserObj }) => {

  // adds Friend to user list
  const addFriend = async() => {
    try {
      const { _id } = actualUserObj
      const { data } = await axios.put('/api/friend', { _id, friend: fText })
      if (data === 'Friend added') {
        window.alert('Friend added!')
        setNewFriend()
        setFText('')
      } else {
        window.alert('Error: no user with that username!')
      }
    } catch (err) {
      console.log(err)
      window.alert('Error: addFriend')
    }
  }

  return (
    <div>
      <div
        className="overlay"
        style={{
          position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#000', zIndex: '5', opacity: '0.4',
        }}
      />
      <div
        className="content"
        style={{
          position: 'fixed', zIndex: '10', background: '#fff', top: '50%', left: '50%', width: '20rem', height: '15rem', transform: 'translate(-50%, -50%)', borderRadius: '0.5rem',
        }}
      >
        <Form style={{ margin: '2rem' }}>
          <Form.Group>
            <Form.Label> New Friend: </Form.Label>
              <Form.Control type="text" placeholder="Add new friend username" onChange={e => setFText(e.target.value)} />
          </Form.Group>
          <br/>
          <div className="d-grid gap-2">
            <Button className="btn mx-1 btn-warning hover" onClick={() => addFriend()} >
              Submit Friend Request!
            </Button>
            <Button className="btn mx-1 btn-dark hover" onClick={setNewFriend}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddFriends
