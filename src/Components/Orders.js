import { Breadcrumbs, Checkbox, FormControlLabel, FormGroup, Paper, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Footer from "./Footer";
import OrderItem from "./OrderItem";
import { getCurrentUserUserId } from "../Auth";
import { useEffect, useState } from "react";
import axios from "axios";
const Orders = () => {

    const userid = getCurrentUserUserId();
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        axios.get(`http://localhost:8083/order/user/${userid}`).then(
            (response) => {
                setOrders(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    useEffect(() => {
        getOrders();
    }, []);


    return (
        <>
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
                    <Typography color="text.primary">Orders</Typography>
                </Breadcrumbs>
            </div>


            <div className="container" style={{ marginBottom: "73px", display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                <Paper style={{
                    position: "sticky",
                    top: "20px", maxHeight: "240px", display: "flex", marginTop: "20px", flexDirection: "column", padding: "20px", width: "220px"
                }}>
                    <FormGroup>
                        <h4>Filters</h4>
                        <FormControlLabel control={<Checkbox />} label="On the way" />
                        <FormControlLabel control={<Checkbox />} label="Delivered" />
                        <FormControlLabel control={<Checkbox />} label="Returned" />
                        <FormControlLabel control={<Checkbox />} label="Cancelled" />
                    </FormGroup>
                </Paper>

                <div className="orders-list" style={{ width: "800px", display: "flex", flexDirection: "column" }}>
                    {orders.map((order) => (
                        <Paper key={order.id} style={{ padding: "20px", marginBottom: "10px" }}>
                            <Typography variant="subtitle2">Order ID: {order.id}</Typography>
                            <Typography variant="body2">Status: {order.status}</Typography>
                            <Typography variant="body2">Date: {order.orderDate.slice(0, 10)}</Typography>  {/* Extract only date portion */}
                            <Typography variant="body2">Total Amount: ₹{order.totalAmount.toFixed(2)}</Typography>  {/* Format to 2 decimal places */}
                        </Paper>
                    ))}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>

    );

}
export default Orders;