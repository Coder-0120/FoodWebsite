import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar';

const Login = () => {

     const[credential,setcredential] = useState({
            email:"",
            password:""
        })
        
        const onChange=(e)=>{
            setcredential({...credential,[e.target.name]:e.target.value})
        }
        const handlesubmit = async(e) => {
            e.preventDefault();
            console.log(JSON.stringify({email:credential.email,password:credential.password}));
    
            try {
                const {email,password}=credential;
                const response = await fetch("http://localhost:3000/api/loginuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                        
                    })
                });
                console.log("Response Status:", response.status);
                const json = await response.json();
                console.log("Response Body:", json);
                if (!json.success) {
                    alert("Enter valid credentials");
                } else {
                    alert("Login successful!");
                    localStorage.setItem("userEmail",credential.email);
                    localStorage.setItem("token",json.authtoken);
                    window.location.href="/";
                    
                }
            } catch (error) {
                console.error("Error during fetch:", error);
                alert("An error occurred while login . Please try again later.");
            }
        };
    
        
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
        Login for Delicious Meals!
    </h2>

  

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
        Login
    </button>

    <div className="text-center mt-3">
        <Link to="/createuser" className="btn btn-outline-success" style={{ padding: "8px 20px", fontWeight: "600", borderRadius: "5px" }}>
            New user? Sign up
        </Link>
    </div>
</form>
</div>


   </>
  )
}

export default Login