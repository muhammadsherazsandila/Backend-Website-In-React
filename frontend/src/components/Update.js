import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MyContext } from '../context/Mycontext'

export default function Update() {

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [panelColor, setPanelColor] = useState('')
    const [textColor, setTextColor] = useState('')
    const [productPic, setProductPic] = useState(null)
    const [productPicFile, setProductPicFile] = useState(null)
    const {state , setState} = useContext(MyContext)
    const [showAlert , setShowAlert] = useState(false)


    const { id } = useParams();
    useEffect(() => {
        const fethData = async () => {
            const response = await axios.get(`/api/workouts/update/${id}`)
            const data = response.data;
            setProductName(data.productName)
            setProductPrice(data.productPrice)
            setPanelColor(data.panelColor)
            setTextColor(data.textColor)
            setProductPic(data.productPic)
        }
        fethData();
    },[id])

    const updateHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productName" , productName)
        formData.append("productPrice",productPrice)
        formData.append("panelColor", panelColor)
        formData.append("textColor", textColor)
        if(productPic){
            formData.append("productPic", productPicFile)
        }else{
            console.log("file not uploaded")
        }
        const response =await axios.put(`/api/workouts/update/${id}` , formData,{
            headers: {
                "Content-Type": "multipart/form-data"  // Ensure the request content is form-data
            }
        });
        const data = response.data;
        setProductName(data.productName)
        setProductPrice(data.productPrice)
        setPanelColor(data.panelColor)
        setTextColor(data.textColor)
        setProductPic(data.productPic)
        setShowAlert(true)
        setState("Updated Successfully!")
    }


    const updateImageHandler = (e)=>{
        const file = e.target.files[0]
        setProductPic(URL.createObjectURL(file))
        setProductPicFile(file)
    }


    return (
        <div>
            <div className='form-container'>
            {showAlert && <div className="alert">{state}</div>}
                <h1>Update A Product</h1>
                <div className="d-flex justify-content-around items-center w-100 p-5">
                    <form className='form' onSubmit={updateHandler}>
                        <div className='text-start'>
                            <label htmlFor="Product Name" className='fw-bold'>Product Name:</label>
                            <input type="text" name='productName' placeholder='Product Name' onChange={e => setProductName(e.target.value)} value={productName} />
                        </div>
                        <div className="text-start">
                            <label htmlFor="Product Price" className='fw-bold'>Product Price:</label>
                            <input type="text" name='productPrice' placeholder='Product Price' onChange={e => setProductPrice(e.target.value)} value={productPrice} />
                        </div>
                        <div className="text-start">
                            <label htmlFor="Panel Color" className="fw-bold">Panel Color:</label>
                            <input type="color" name='panelColor' placeholder='Panel Color' onChange={e => setPanelColor(e.target.value)} value={panelColor} />
                        </div>
                        <div className="text-start">
                            <label htmlFor="Text Color" className="fw-bold">Text Color:</label>
                            <input type="color" name='textColor' placeholder='Text Color' onChange={e => setTextColor(e.target.value)} value={textColor} />
                        </div>
                        <div className="text-start">
                            <label htmlFor="Product Picture" className="fw-bold">Product Picture:</label>
                            <input type="file" name='productPic' onChange={updateImageHandler} />
                        </div>
                        <button type='submit' className='btn btn-primary'>Update</button>
                    </form>
                    <div className="w-25 border rounded border-secondary h-100 overflow-hidden">
                        <img src={productPic} className="w-100 h-100 rounded-top" alt="..." />
                        <div className="rounded-bottom p-3" style={{ backgroundColor: `${panelColor}`, color: `${textColor}` }}>
                            <h5 className="card-title mb-2">{productName}</h5>
                            <p className="card-text">${productPrice}-/</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
