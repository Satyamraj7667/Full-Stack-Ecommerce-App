import { Female, Male } from '@mui/icons-material';
import { Button, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

function SignUp() {

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        gender: 'Male',
        dob: null,
        email: '',
        mobile: '',
        password: '',
        role:"NORMAL"
    });
    const [repeatPassword, setRepeatPassword] = useState('');
    const handleChange = (event) => {
        const { name, value, type } = event.target;

        // Handling different input types
        const newValue = type === 'date' ? value : (type === 'checkbox' ? event.target.checked : value);
        setUser({ ...user, [name]: newValue });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== repeatPassword) {
            toast.error("passwords don't match");
            return;
        }
        axios.post("http://localhost:8082/auth/register", user)
            .then((response) => {
                toast.success("Successfully Registered");
                // Clear the form after successful submission
                setUser({
                    
                });
                setRepeatPassword("");
            },
                (error) => {
                    if (error.response && error.response.status === 409) { // Check for 409 Conflict status code
                        toast.error("Email already exists. Please try with a different email or log in.");
                    } else {
                        toast.error("Something went wrong"); // Handle other errors generically
                    }
                }
            )

    }




    return (
        <>
            <Toaster />
            <Navbar />



            <form onSubmit={handleSubmit}>
                <div className="flex-container" style={{ background: "linear-gradient(to right, #4776e6, #8e54e9)", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>

                    <Paper elevation={24} style={{ display: "flex", marginTop: "20px", marginBottom: '20px', flexDirection: "column", padding: "20px", maxWidth: "600px", fontFamily: '"Roboto", sans-serif' }}>

                        <div>
                            <h2>Sign Up</h2>
                        </div>

                        <div className="name" style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <div>
                                <TextField required id="firstname" name="firstname" value={user.firstname} label="First name" onChange={handleChange} variant="standard" />
                            </div>
                            <div>
                                <TextField required id="lastname" name="lastname" value={user.lastname} label="Last name" onChange={handleChange} variant="standard" />
                            </div>
                        </div>

                        <div className="Gender" style={{ marginInlineStart: "33px", paddingTop: "20px" }}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Gender
                            </InputLabel>
                            <Select
                                required
                                variant="standard"
                                id="gender"
                                name="gender"
                                label="Gender"
                                value={user.gender}
                                onChange={handleChange}
                            >
                                <MenuItem value='Male'><Male /> Male</MenuItem>
                                <MenuItem value='Female'><Female /> Female</MenuItem>

                            </Select>
                        </div>

                        <div className="DOB" style={{ marginInlineStart: "33px", paddingTop: "30px" }}>
                            <p1>Date of Birth </p1>
                            <input type="date" label="Date of Birth" id="dob" name="dob" required value={user.dob} onChange={handleChange} variant="standard" />
                        </div>

                        <div className="Email" style={{ marginInlineStart: "33px", paddingTop: "20px" }}>
                            <TextField required type="email" id="email" name="email" value={user.email} onChange={handleChange} label="Email" variant="standard" />
                        </div>

                        <div className="Phone" style={{ marginInlineStart: "33px", paddingTop: "20px" }}>
                            <TextField required type="tel" id="mobile" name="mobile" value={user.mobile} onChange={handleChange} label="Mobile" variant="standard" />
                        </div>

                        <div className="password" style={{ marginInlineStart: "33px", paddingTop: "20px" }}>
                            <TextField required type="password" id="password" name="password" value={user.password} onChange={handleChange} label="Password" variant="standard" autoComplete="new-password" />
                        </div>

                        <div className="repeat-password" style={{ marginInlineStart: "33px", paddingTop: "20px" }}>
                            <TextField required type="password" name="repeat-password" id="repeat-password" label="Repeat Password" variant="standard" autoComplete="new-password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)} />
                        </div>

                        <div className="submit" style={{ marginInlineStart: "33px", paddingTop: "30px", paddingBottom: "20px" }}>
                            <Button type="submit" variant="contained">Submit</Button>
                        </div>
                    </Paper>
                </div>
            </form>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default SignUp;