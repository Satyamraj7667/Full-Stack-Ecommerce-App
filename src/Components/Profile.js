import Navbar from "./Navbar";
import Male_Avatar from "./../Assets/Images/Male_Avatar.jpg";
import OrderIcon from "./../Assets/Images/ordersicon.jpg";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import UpdateProfile from "./UpdateProfile";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useEffect, useState } from "react";
import { Breadcrumbs, Button, Divider, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Footer from "./Footer";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ProfileDetails from "./ProfileDetails";
import { doLogout, getCurrentUserEmail, getCurrentUserToken } from "../Auth";
import axios from "axios";
import Female_Avatar from "./../Assets/Images/Femaie-Avatar.png";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/cartSlice";

function Profile() {

    const [activeContent, setActiveContent] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleordersclick = () => {
        navigate("/user/orders");
    };
    const handleItemClick = (content) => {
        setActiveContent(content);
    };
    const handleAddressClick = () =>{
      
        navigate("/user/address/");
    }

    const handleLogout = () => {
        dispatch(clearCart());
        doLogout();
        navigate("/login");
    }

    const renderContent = () => {
        switch (activeContent) {
            
            case "Account":
                return (
                    <UpdateProfile FirstName={user.firstname} LastName={user.lastname} Gender={user.gender} DateofBirth={user.dob} Email = {user.email} Phone={user.mobile}/>
                );
            
            case "Wishlist":
                return (
                    <div>
                        <p>This is your Wishlist content.</p>
                    </div>
                );
            case "Logout":
                return (
                    <div>
                        <p>You are now logged out.</p>
                    </div>
                );
            
            default:
                return (<ProfileDetails FirstName={user.firstname} LastName={user.lastname} Gender={user.gender} DateofBirth={user.dob} Email = {user.email} Phone={user.mobile} />);
        }
    };

    const email = getCurrentUserEmail();
    const token = getCurrentUserToken();
    const [user,setUser] = useState(null);
    
    const getCurrentUser = () =>{
        console.log(email);
        console.log(token);
        axios.get(`http://localhost:8082/user/email/${email}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(
         (response) => {
            if (response.data) {
                setUser(response.data);
                console.log(response.data);
            } else {
                console.error("Empty response received from server.");
            }
         },
         (error) => {
            console.log(error);
         }
 
        )
     }
     useEffect(() => {
         getCurrentUser();
     }, [] )

     
  if (!user) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

    return (
        <>
            <Navbar />

            <div className="Navigation" style={{margin:"5px"}} > 
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link style={{ textDecoration: "none" }} underline="hover" color="inherit" to="/">
                        Home
                    </Link>
                    <Typography color="text.primary">Profile</Typography>
                </Breadcrumbs>
            </div>


            <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "start" }}>

                <div className="Sidebar" style={{ marginBottom:"32px",display: "flex", flexDirection: "column", paddingRight: "10px" }}>

                    <Paper className="Sidebar1" style={{ width: "250px", maxWidth: "250px", margin: "20px" }}>
                        <div className="Greeting" style={{ marginBottom: "-30px", marginLeft: "85px", fontSize: "13px", marginTop: "10px" }}>Hello,</div>
                        {(user.gender === "Male") ? <img src={Male_Avatar} alt="Male" style={{ marginTop: "27px", margin: "15px", width: "50px", borderRadius: "50%", objectFit: "contain" }} />: <img src={Female_Avatar} alt="Male" style={{ marginTop: "27px", margin: "15px", width: "50px", borderRadius: "50%", objectFit: "contain" }} /> }
                        <span style={{ fontWeight: "bold", marginRight: "20px" }}> {user.firstname} {user.lastname}</span>

                    </Paper>

                    <Paper className="Sidebar2" style={{ display: "flex", flexDirection: "column", maxWidth: "250px", marginLeft: "20px" }}>

                        <Button variant="Text" size="large" onClick={() => handleordersclick()} style={{ display: "flex", justifyContent: "start", marginTop: "10px" }}>
                            <img src={OrderIcon} alt="order" style={{ width: "23px" }} /><span style={{ marginLeft: "15px", fontFamily: "revert-layer" }}>MY ORDERS</span>
                        </Button>
                        <Divider />
                        <Button variant="Text" size="large" onClick={() => handleItemClick("Account")} style={{ display: "flex", justifyContent: "start", marginTop: "5px" }}>
                            <ManageAccountsIcon/><span style={{ marginLeft: "15px", fontFamily: "revert-layer" }}>ACCOUNT SETTINGS</span>
                        </Button>
                        <Divider />
                        <Button variant="Text" size="large" onClick={() => handleAddressClick()} style={{ display: "flex", justifyContent: "start", marginTop: "5px" }}>
                            <FmdGoodIcon /><span style={{ marginLeft: "15px", fontFamily: "revert-layer" }}>ADDRESS</span>
                        </Button>
                        <Divider />
                        <Button variant="Text" size="large" style={{ display: "flex", justifyContent: "start", marginTop: "5px" }}>
                            <FavoriteIcon /><span style={{ marginLeft: "15px", fontFamily: "revert-layer" }}>WISHLIST</span>
                        </Button>
                        <Divider />
                        <Button variant="Text" onClick={handleLogout} size="large" style={{ display: "flex", justifyContent: "start", marginTop: "5px" }}>
                            <LogoutIcon /><span style={{ marginLeft: "15px", fontFamily: "revert-layer" }}>LOGOUT</span>
                        </Button>
                    </Paper>

                </div>

                <Paper className="main-content" style={{ marginBottom:"20px",display: "flex", marginTop: "20px", width: "800px" }}>
                    {renderContent()}
                </Paper>


            </div>
            <div >
                <Footer />
            </div>
        </>
    );

}
export default Profile;