import { Button, Paper } from '@mui/material'
import { useState } from 'react'
import Footer from "./Footer"
import Navbar from './Navbar';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import img from "./../Assets/Images/6013781.jpg"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { doLogin } from "./../Auth" 

function Login() {

    const navigate = useNavigate();
  

    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    });

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post("http://localhost:8082/auth/login",loginData).then(
            (response) => {
              if(response.data){
                toast.success("Login Successfull");
                doLogin(response.data);
                setTimeout(() => navigate("/"), 1000); 
              }
            },
            (error) => {
                if (error.response && error.response.status === 401) { // Check for 409 Conflict status code
                    toast.error("Bad credentials");
                }
                else{
                    toast.error("Something went wrong");
                }
            }
        )

    }

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = value;
        setLoginData({ ...loginData, [name]: newValue });
    }

    const [visiblePassword, setVisiblePassword] = useState(false);
    const showPassword = () => {
        const passwordInput = document.getElementById("password")
        if (!passwordInput) {
            return;
        }
        setVisiblePassword(!visiblePassword);
        passwordInput.type = visiblePassword ? "text" : "password";
    }

    return (
        <>
        <Toaster/>
            <Navbar />
            <div className="flex-container" style={{ backgroundImage: `url(${img})`, backgroundPosition: "center", backgroundSize: "cover", fontFamily: '"Roboto",sans-serif', display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={24} style={{ marginTop: "40px", margin: "40px", display: "flex", flexDirection: "column", padding: "30px" }}>
                        <div >
                            <h2>Welcome back!</h2>
                        </div>
                        <div className="input-group mb-3" style={{ marginTop: "30px" }}>
                            <span className="input-group-text" id="inputGroup-sizing-default"><AlternateEmailIcon /></span>
                            <input type="email" id="email" name="email" placeholder="Enter your email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={loginData.email} onChange={handleChange} />
                        </div>
                        <div className="input-group mb-3" style={{ marginTop: "10px" }}>
                            <span className="input-group-text" id="inputGroup-sizing-default"><PasswordIcon /></span>
                            <input type={visiblePassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" className="form-control" aria-label="Sizing example input" value={loginData.password} onChange={handleChange} aria-describedby="inputGroup-sizing-default" />
                            <span onClick={showPassword} className="input-group-text" style={{ background: "white" }} id="inputGroup-sizing-default">
                                {visiblePassword ? <VisibilityIcon color='primary' /> : <VisibilityOffIcon />} </span>
                        </div>

                        <Button type="submit" variant='contained' style={{ background: "#6f31e0", marginTop: "10px", width: "100%" }}>Log In</Button>
                        <Link style={{ textDecoration: "none", marginTop: "15px", fontSize: "14px", alignSelf: "center" }} to="/register">New user? Sign Up</Link>

                    </Paper>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Login;