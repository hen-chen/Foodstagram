import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import Foods from './Foods'

const Home = ({ users }) => {

  return (
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
                    <Foods u_id={u._id} foods={u.foods} />
                </Container>
                {u.foods.length === 0 && <p> No favorite foods :( </p>}
                <h4>
                  {u.username}
                  &apos;s
                  {' '}
                  Friends:
                </h4>
                {u.friends.map(f => (
                  <div key={uuidv4()}>
                    <p className="card-text">
                      •
                      {' '}
                      {f}
                    </p>
                  </div>
                ))}
                {u.friends.length === 0 && <p> No friends :( </p>}
              </Card.Body>
            </Card>
          ))}
        </Container>
    </div>
  )
}

export default Home
