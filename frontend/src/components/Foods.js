import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import Food from './Food'

const Foods = ({ u_id, foods }) => {
  const [seeMore, setSeeMore] = useState(false)

  const getFoodRegex = url => String(url).split('/')[4]

  return (
    <div>
      <Row>
        {foods.map((f, f_id) => (
          (f_id < 4 || seeMore) ? (
            <Col sm={3}>
              <Food id={f_id+u_id} foodImg={f} foodName={getFoodRegex(f)} />
            </Col>
          ) : null
        ))}
      </Row>
      <Row style={{ marginTop: '1rem' }}>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-start' }}>
          {foods.length > 4 ? (
              seeMore ? (
                <Button variant="info" className="btn" onClick={() => setSeeMore(false)}> See less! </Button>
              ) : (
                <Button variant="info" className="btn" onClick={() => setSeeMore(true)}> See more! </Button>
              )
            ) : null
          }
        </Col>
      </Row>
    </div>
  )
}

export default Foods
