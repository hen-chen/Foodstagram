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
          <h3 style={{ fontFamily: "Americana" }}>Users and their favorite food!</h3>
          {users.map(u => (
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
          ))}
        </Container>
    </div>
  )
}

export default Home
