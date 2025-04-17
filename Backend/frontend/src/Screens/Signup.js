import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Signup = () => {
    const[credential,setcredential] = useState({
        name:"",
        email:"",
        password:"",
        location:""

    })
   
    
    const handlesubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify(credential));

        try {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: credential.name,
                    email: credential.email,
                    password: credential.password,
                    location: credential.location
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
            } else {
                alert("Signup successful!");
                window.location.href="/login";
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            alert("An error occurred while signing up. Please try again later.");
        }
    };

    const onChange=(e)=>{
        setcredential({...credential,[e.target.name]:e.target.value})
    }

    return (
        <>
        <Navbar/>
        <div className="container mt-5 border border-light rounded p-5 bg-gradient-to-r from-yellow-300 to-orange-400 border-radius-5">

            <form 
                onSubmit={handlesubmit} 
                style={{
                    fontWeight: "700", 
                    fontSize: "18px",
                    color: "#4e4e4e", 
                    backgroundColor: "#fff7e6", 
                    padding: "30px", 
                    borderRadius: "12px", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
            >
                <h2 style={{ 
                    textAlign: "center", 
                    color: "#f35f22", 
                    fontWeight: "bold", 
                    textDecorationLine: "underline", 
                    marginBottom: "20px"
                }}>
                    Signup for Delicious Meals!
                </h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{ color: "#f35f22" }}>Name</label>
                    <input 
                        type="text" 
                        name='name'
                        className="form-control" 
                        placeholder="Enter your name" 
                        required 
                        value={credential.name}
                        onChange={onChange}
                        
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inp_email" className="form-label" style={{ color: "#f35f22" }}>Email address</label>
                    <input 
                        type="email" 
                        name='email'
                        className="form-control" 
                        id="inp_email" 
                        placeholder="name@example.com" 
                        required
                        value={credential.email}
                        onChange={onChange}
                        
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inp_pswd" className="form-label" style={{ color: "#f35f22" }}>Password</label>
                    <input 
                        type="password" 
                        name='password'
                        className="form-control" 
                        id="inp_pswd" 
                        required 
                        value={credential.password}
                        onChange={onChange}
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inp_email" className="form-label" style={{ color: "#f35f22" }}>Address</label>
                    <input 
                        type="text" 
                        name='location'
                        className="form-control" 
                        id="inp_addr" 
                        required
                        value={credential.location}
                        onChange={onChange}
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn" 
                    style={{
                        backgroundColor: "#f35f22", 
                        color: "#fff", 
                        fontWeight: "bold", 
                        padding: "12px 25px", 
                        borderRadius: "8px", 
                        border: "none",
                        width: "100%",
                        cursor: "pointer"
                    }}
                >
                    Sign Up
                </button>

                <div className="text-center mt-3">
                    <Link to="/login" className="btn btn-outline-success" style={{ padding: "8px 20px", fontWeight: "600", borderRadius: "5px" }}>
                        Already a user? Login here
                    </Link>
                </div>
            </form>
        </div>
    </>
    );

}

export default Signup;


// av123@gmai.com  123456
// av987@gmail.com  987654