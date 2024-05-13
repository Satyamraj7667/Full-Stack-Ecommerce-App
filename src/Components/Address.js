import Navbar from "./../Components/Navbar";
import Footer from "./../Components/Footer";
import { Button, Paper, Typography, Breadcrumbs } from "@mui/material";
import { useEffect, useState } from "react";
import HouseIcon from '@mui/icons-material/House';
import WorkIcon from '@mui/icons-material/Work';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCurrentUserUserId } from "../Auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


function Address(props) {
    const userid = getCurrentUserUserId(); 
    const [address, setAddress] = useState(
        {
            userId: userid,
            name:"",
            phoneNumber:"",
            city:"",
            state:"",
            pincode:"",
            landmark:"",
            addressInfo:"",
            addressType:""
        }
    );
  
    const type = "Home";
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type === 'checkbox' ? event.target.checked : value;     
        setAddress({ ...address, [name]: newValue });
    }
    
    

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        axios.post("http://localhost:8084/address", address).then
        ((response) => {
            toast.success("Address saved successfully");
            fetchAddresses();
            event.target.reset();
        },
        (error) =>{
            toast.error("Something went wrong");
        }                       
    )
    
    }
    
    const [addresses,setAddresses] = useState([]); 
    const fetchAddresses = async () => {
      await axios.get(`http://localhost:8084/address/user/${userid}`).then(
        (response) => {
          setAddresses(response.data)
        },
        (error) => {
            console.log(error);
        }
        )
    }
    useEffect (() => {
        fetchAddresses();
    },[]);

    const handleDelete = async (addressid) =>{
        console.log(addressid);
      await axios.delete(`http://localhost:8084/address/${addressid}`).then(
        (response) => {
            toast.success("Successfully deleted");
            fetchAddresses();
        },
        (error) => {
            toast.error("something went wrong");
            console.log(error);
        }

      )
    }

    return (
        <>
            <Toaster/>
            <Navbar />

            <div className="Navigation" style={{ margin: "5px" }} >
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link style={{ textDecoration: "none" }} underline="hover" color="inherit" to="/">
                        Home
                    </Link>
                    <Link
                        style={{ textDecoration: "none" }}
                        underline="hover"
                        color="inherit"
                        to="/user/profile"
                    >
                        Profile
                    </Link>
                    <Typography color="text.primary">Address</Typography>
                </Breadcrumbs>
            </div>

            <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent:"space-evenly",fontFamily: '"roboto",sans-serif' }}>
                <form onSubmit={handleSubmit}>
                    <Paper className="address-form p-3" style={{ position:"sticky",top:"20px",display: "flex", marginTop: "20px", marginBottom: "20px", flexDirection: "column" }}>
                        <p style={{ fontSize: "17px", color: "blue", fontWeight: "bold" }}>ADD A NEW ADDRESS</p>
                        <div style={{ display: "flex", fontSize: "14px", marginTop: "7px", justifyContent: "space-between" }}>
                            <div style={{marginRight:"3px"}}>
                                <input type="text" name="name" placeholder="Name" className="form-control " value={address.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <input type="tel" name="phoneNumber" className="form-control" placeholder="10 digit mobile number" value={address.phoneNumber} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ display: "flex", marginTop: "15px", justifyContent: "space-between"}}>
                            <div>
                                <input type="tel" name="pincode" placeholder="Pincode" className="form-control" value={address.pincode} onChange={handleChange} required />
                            </div>
                            <div>
                                <input type="text" name="landmark" className="form-control" placeholder="Landmark" value={address.landmark} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <input type="text" name="addressInfo" value={address.addressInfo} onChange={handleChange} style={{ width: "100%", marginTop: "15px", height: "90px" }} className="form-control" placeholder="Address (Area and Street)" />
                        </div>

                        <div style={{ display: "flex", marginTop: "15px", justifyContent: "space-between" }}>
                            <div>
                                <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City/District/Town" required className="form-control" />
                            </div>
                            <div>
                                <input type="text" name="state" value={address.state} onChange={handleChange} className="form-control" required placeholder="State" />
                            </div>
                        </div>


                        <div style={{ display: "flex", fontSize: "14px", fontFamily: "inherit", alignItems: "center", marginTop: "15px" }}>
                            <label style={{ marginLeft: "3px" }}>Address Type :</label>
                            <div style={{ marginLeft: "10px" }}>
                                <input type="radio" id="work" name="addressType" value="Work" checked={address.addressType === "Work"} onChange={handleChange} />
                                <label htmlFor="work"> Work</label>
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <input type="radio" id="home" name="addressType" value="Home" checked={address.addressType === "Home"} onChange={handleChange} />
                                <label htmlFor="home"> Home</label>
                            </div>
                        </div>




                        <div style={{ marginTop: "15px" }}><Button type="submit" color="primary" variant="contained">save</Button></div>


                    </Paper>
                </form>

                <div className="address-list p-2" style={{ marginTop: "12px", display: "flex", flexDirection: "column", width:"600px" }}>
                     {
                       addresses.length > 0 ? addresses.map((addressitem) =>
                     
                    <Paper style={{ marginBottom:"10px",paddingLeft: "20px",paddingTop:"10px",paddingBottom:"10px", paddingRight:"10px",width:"100%" }}>
                        <div style={{ padding: "3px", fontWeight: "bold",display:"flex",justifyContent:"space-between", fontSize: "12px" }}>
                            <div>{
                                addressitem.addressType === "Home" ? <><HouseIcon /> Home</> : <><WorkIcon /> Work</>
                            }
                            </div>
                            <div><IconButton onClick={() => handleDelete(addressitem.addressId)} size="small" sx={{padding:"0px"}}><DeleteIcon/></IconButton></div>

                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                            <div style={{ marginRight: "20px", fontWeight: "bold",fontSize:"13px" }}>{addressitem.name}</div>
                            <div  style={{ fontWeight: "bold" ,fontSize:"13px" }}>{addressitem.phoneNumber}</div>
                        </div>
                        <div style={{ marginTop: "10px", fontSize:"13px" }}>{addressitem.addressInfo}, {addressitem.landmark}</div>
                        <div style={{ display: 'flex' }}>
                            <div style={{marginRight:"2px", fontSize:"13px"}}>{addressitem.city}, </div><span> </span>
                            <div style={{marginRight:"2px", fontSize:"13px"}}>{addressitem.state} -</div>
                            <div style={{marginLeft:"1px", fontSize:"13px",fontWeight: "bold" }}>{addressitem.pincode}</div>
                        </div>
                    </Paper>
                    )
                    : "No addresses availabe"
                }
                  




                </div>



            </div>
            <Footer />
        </>
    )

}
export default Address;