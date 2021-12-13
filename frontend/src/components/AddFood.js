import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'
import Foods from './Foods'

const AddFood = ({ loggedIn, actualUserObj, setActualUserObj }) => {
  const [image, setImage] = useState(null)
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
      const { data: userData } = await axios.get('/account/check')
      if (userData !== 'user not logged in') {
        setActualUserObj(userData)
        console.log(data)
      }
    } catch (err) {
      console.log(err)
      window.alert('Error: addF')
    }
  }

  return (
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
  )
}

export default AddFood
