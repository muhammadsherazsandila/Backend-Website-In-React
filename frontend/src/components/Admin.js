import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Mycontext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Admin() {

  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [panelColor, setPanelColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const [productPic, setProductPic] = useState('')
  const [showProducts, setShowProducts] = useState([])
  const { state, setState } = useContext(MyContext)
  const [showAlert, setShowAlert] = useState(false); // Alert visibility

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName)
    formData.append("productPrice", productPrice)
    formData.append("panelColor", panelColor)
    formData.append("textColor", textColor)
    formData.append("productPic", productPic)
    const response = await axios.post("/api/workouts/createWorkout", formData)
    try {
      setState(response.data)
      setProductName('')
      setProductPrice('')
      setProductPic('')
      setPanelColor('')
      setTextColor('')
      setProductPic('')
      const productImg = document.querySelector('input[type="file"]')
      if (productImg.value !== '') {
        productImg.value = ''
      }
    } catch (error) {
      setState(error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/workouts");
        setShowProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  })
  useEffect(() => {
    if (state !== false) {
      setShowAlert(true);
      // Hide alert after 3 seconds
      const timer = setTimeout(() => setShowAlert(false), 3000);
      
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [state]);
  const deleteProduct = async (id) => {
    const response = await fetch(`/api/workouts/delete/${id}`);
    const json = await response.json();
    if (response.ok) {
      setState(json)
    }
  }

  const navigate = useNavigate();
  const showUpdatePage = (id) => {
    navigate(`/updateProduct/${id}`)
  }

  return (
    <div className='form-container'>
      <h1>Create A New Product</h1>
      <form className='form' onSubmit={submitHandler}>
        <input type="text" name='productName' placeholder='Product Name' onChange={e => setProductName(e.target.value)} value={productName} />
        <input type="text" name='productPrice' placeholder='Product Price' onChange={e => setProductPrice(e.target.value)} value={productPrice} />
        <input type="text" name='panelColor' placeholder='Panel Color' onChange={e => setPanelColor(e.target.value)} value={panelColor} />
        <input type="text" name='textColor' placeholder='Text Color' onChange={e => setTextColor(e.target.value)} value={textColor} />
        <input type="file" name='productPic' onChange={e => setProductPic(e.target.files[0])} />
        <button type='submit' className='btn btn-primary'>Create</button>
      </form>
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center">
            {showProducts.map(workout => (
              <div className="card" key={workout._id}>
                <img src={workout.productPic} />
                <div className="card-body">
                  <h5 className="card-title"> {workout.productName} </h5>
                  <p className="card-text"> {workout.productPrice} </p>
                  <div className="d-flex justify-content-between items-center">
                    <button className='btn btn-success' onClick={() => showUpdatePage(workout._id)}>Update</button>
                    <button className="btn btn-primary" onClick={() => deleteProduct(workout._id)}>Delete</button>
                    {showAlert && <div className="alert">{state}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
