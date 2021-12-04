import React, { useState } from 'react'

const App = () => {
  const [image, setImage] = useState(null)

  return (
    <>
      <h1> Food! </h1>
      <button className="btn" onClick={() => {
        fetch('https://foodish-api.herokuapp.com/api/')
          .then(res => res.json())
          .then(({ image }) => {
            setImage(image)
          })
      }}>
        Load food image!
      </button>
      <img src={image} />
    </>
  )
}
export default App