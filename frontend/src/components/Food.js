import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

const Food = ({ id, foodImg, foodName }) => {

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
  const inEffect = e => {
    e.target.style.opacity = '0.3'
    document.getElementById(id).style.display = 'block'
    console.log(foodName)
  }

  const outEffect = e => {
    e.target.style.opacity = '1'
    document.getElementById(id).style.display = 'none'
  }

  return (
    <div>
      <style>{css}</style>
      <Container style={{ position: 'relative', textAlign: 'center'}}>
        <Image style={{ maxWidth: '200px', maxHeight:'150px', marginTop:'0.5rem' }} src={foodImg} onMouseEnter={e => inEffect(e)} onMouseLeave={e => outEffect(e)}></Image>
        <p id={id} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'none'}}>{foodName}</p>
      </Container>
    </div>
  )
}

export default Food
