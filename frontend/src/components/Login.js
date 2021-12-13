import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const findUser = async () => {
    try {
      const { data } = await axios.post('/account/login', { username, password })
      if (data === 'user logged in successfully') {
        navigate('/')
      } else if (username === '' || password === '') {
        alert('missing input fields')
      } else {
        alert(data)
      }
    } catch (err) {
      alert('user login has problems')
    }
  }

  const css = `
    .login-box {
        border-radius: 3%;
        border-color: #FFFFFF !important;
        padding: 4vh 4vw 4vh 4vw;
        margin-top: 5vh;
        margin-left: 35vw;
        margin-right: 35vw;
        background-color: #FFFFFF;
      }
`

  return (
    <div>
      <style>{css}</style>
      <div className="container-fluid p-3" style={{ padding: '2rem 2rem' }}>
        <div className="shadow border login-box">
          <div className="row">
            <div className="col">
              <h1 style={{ fontFamily: "Americana", fontWeight: "bold" }}>Login</h1>
            </div>
          </div>
          <Form style={{ width: '15rem' }}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label style={{ fontFamily: "Americana" }}> Username: </Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ fontFamily: "Americana" }}> Password: </Form.Label>
              <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
              <br />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="info" onClick={findUser} size="lg"> Log In </Button>
            </div>
          </Form>
          <p style={{ fontFamily: "Americana" }}>
            Don&apos;t have an account?
            {' '}
            <Link to="/signup">Sign up!</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
