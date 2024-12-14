import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Mycontext'
import axios from 'axios'

export default function Home() {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://backend-website-in-react-backend.vercel.app/api/workouts")
                setWorkouts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })

    return (
        <div>


            {/* <!-- Hero Section --> */}
            <header className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to Our Landing Page</h1>
                    <p className="lead">We offer amazing solutions to elevate your business.</p>
                    <a href="#features" className="btn btn-light btn-lg">Learn More</a>
                </div>
            </header>

            {/* <!-- Features Section --> */}
            <section id="features" className="py-5">
                <div className="container">
                    <div className="row text-center">
                        {workouts.map(workout => (
                            <div className="card"  key={workout._id}>
                            <img src={workout.productPic} />
                            <div className="card-body">
                              <h5 className="card-title"> {workout.productName} </h5>
                              <p className="card-text"> {workout.productPrice} </p>
                              <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* <!-- About Section --> */}
            <section id="about" className="py-5 bg-light">
                <div className="container text-center">
                    <h2>About Us</h2>
                    <p className="lead">We are a team of professionals dedicated to delivering the best solutions for your business needs.</p>
                </div>
            </section>

            {/* <!-- Contact Section --> */}
            <section id="contact" className="py-5">
                <div className="container text-center">
                    <h2>Contact Us</h2>
                    <p className="lead">Have questions? Get in touch with us today!</p>
                    <a href="mailto:info@yourcompany.com" className="btn btn-primary">Email Us</a>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p>&copy; 2024 Your Company. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}
