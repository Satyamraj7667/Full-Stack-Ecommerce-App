import CheckIcon from '@mui/icons-material/Check';
import { Button, Paper } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCurrentUserUserId } from '../Auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HouseIcon from '@mui/icons-material/House';
import WorkIcon from '@mui/icons-material/Work';
import { useLocation, useNavigate } from 'react-router-dom';
import FormatPrice from '../Helper/FormatPrice';
import { useSelector } from 'react-redux';
import useRazorpay from "react-razorpay";

function AddressSelect() {
    const userid = getCurrentUserUserId();
    const [Addresses, setAddresses] = useState([]);
    const [receivedOrder, setReceivedOrder] = useState({});

    const location = useLocation();
    const { totalAmount, mrp, deliveryFee } = location.state || {};

    const Products = useSelector((store) => store.cart.cartItems);

    const [orderProductIds, setOrderProductIds] = useState([]);
    const [orderProductQuantities, setOrderProductQuantities] = useState([]);
    useEffect(() => {
        const { productIds, quantities } = transformCartToOrderItems(Products);
        setOrderProductIds(productIds);
        setOrderProductQuantities(quantities);
    }, [Products]);



    function transformCartToOrderItems(Products) {
        if (!Products || Products.length === 0) {
            return {
                productIds: [],
                quantities: []
            };
        }

        const productIds = [];
        const quantities = [];

        Products.forEach((item) => {
            productIds.push(item.product.id);
            quantities.push(item.cartQuantity);
        });

        return {
            productIds: productIds,
            quantities: quantities
        };
    }





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
    useEffect(() => {
        fetchAddresses();
    }, []);


    const [orderid,setOrderid] = useState('');
    const [Razorpay] = useRazorpay();
    const [paymentId, setPaymentId] = useState('');
    const navigate = useNavigate();
    const handlePayment = async () => {
        
        const razorpay = new Razorpay({
            key: 'rzp_test_4HPMaP72AZy6ih',
            amount: totalAmount * 100,
            currency: 'INR',
            // Add other options as needed
            order_id: orderid,
            handler: function (response) {
                setPaymentId(response.razorpay_payment_id);
                console.log("Handler function called!");
                console.log(receivedOrder.id);
                
                const paymentid = response.razorpay_payment_id;
                console.log(paymentid);
                // Send payment ID to backend
                axios.post(`http://localhost:8083/order/payment/${receivedOrder.id}`, paymentid)
                    .then(() => {
                        // Redirect to success page
                        console.log("successsfully sent")
                        navigate("/user/paymentSuccess");
                    })
                    .catch((error) => {
                        console.error('Error updating payment status:', error);
                    });
            },
        });
        razorpay.on("payment.failed", function (response) {
            alert(response.error.code);
          
        });

        razorpay.open();
    };

   
    
    const handleSaveOrder = (addressId) => {
        const order = {
            userId: userid,
            status: 'CREATED', // Assuming initial status
            orderProductIds: orderProductIds,
            orderProductQuantities: orderProductQuantities,
            shippingAddressId: addressId,
            orderDate: new Date(), // Use current date/time
            totalAmount: totalAmount,
            deliveryFee: deliveryFee,
            paymentStatus: 'false', // Assuming initial payment status
            paymentMethod: '', // Payment method details can be added later
            paymentId: '', // Payment ID can be set after successful payment
        }
        axios.post("http://localhost:8083/order", order).then(
            (response) => {
                setReceivedOrder(response.data);
                axios.get(`http://localhost:8083/order/payment/${totalAmount}`).then(
                    (response) =>{
                        console.log(response.data);
                        setOrderid(response.data);
                        
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            },
            (error) => {
                console.log(error);
            }
        )


    }
    useEffect(() => {
        // Check if receivedOrder has been updated
        if (receivedOrder.id) { // Assuming the order ID is in receivedOrder.id
            handlePayment(receivedOrder.id);
        }
    }, [receivedOrder]);


    return (
        <>
            <Navbar />

            <div className="flex-container" style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="lefts" style={{ display: "flex", width: "750px", flexDirection: "column", fontFamily: '"roboto", sans-serif' }}>


                    <Paper style={{ display: "flex", padding: "20px", marginTop: "15px", maxWidth: "800px" }}>
                        <div style={{ background: "#ebeced", color: "#075fed", marginRight: "20px", paddingLeft: "5px", paddingRight: "5px" }}>1</div>
                        <div style={{ color: "#969696", fontWeight: "bold", marginRight: "20px" }}>LOGIN</div>
                        <div><CheckIcon sx={{ height: "20px", marginTop: "-3px" }} /></div>
                    </Paper>

                    <Paper style={{ marginTop: "15px", marginBottom: "15px", maxWidth: "800px" }}>
                        <div style={{ background: "#075fed", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px", display: "flex" }}>
                            <div style={{ color: "white", paddingLeft: "5px", marginRight: "20px", paddingRight: "5px" }}>2</div>
                            <div style={{ color: "white", fontWeight: "bold" }}>DELIVERY ADDRESS</div>
                        </div>
                        <div>
                            {Addresses.length > 0 ? Addresses.map((addressitem) =>
                                <div className="address-objects border border-bottom" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ paddingLeft: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
                                        <div style={{ padding: "3px", fontWeight: "bold", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                                            <div>{
                                                addressitem.addressType === "Home" ? <><HouseIcon /> Home</> : <><WorkIcon /> Work</>
                                            }
                                            </div>


                                        </div>
                                        <div style={{ display: "flex", marginTop: "10px" }}>
                                            <div style={{ marginRight: "20px", fontWeight: "bold", fontSize: "13px" }}>{addressitem.name}</div>
                                            <div style={{ fontWeight: "bold", fontSize: "13px" }}>{addressitem.phoneNumber}</div>
                                        </div>
                                        <div style={{ marginTop: "10px", fontSize: "13px" }}>{addressitem.addressInfo}, {addressitem.landmark}</div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginRight: "2px", fontSize: "13px" }}>{addressitem.city}, </div><span> </span>
                                            <div style={{ marginRight: "2px", fontSize: "13px" }}>{addressitem.state} -</div>
                                            <div style={{ marginLeft: "1px", fontSize: "13px", fontWeight: "bold" }}>{addressitem.pincode}</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "30px", marginRight: "10px" }}><Button variant="contained" onClick={() => handleSaveOrder(addressitem.addressId)} color='warning'>DELIVER HERE</Button></div>
                                </div>
                            )
                                : "No addresses"}

                        </div>
                    </Paper>

                    <Paper style={{ display: "flex", padding: "20px", marginTop: "15px", marginBottom: "15px", maxWidth: "800px" }}>
                        <div style={{ background: "#ebeced", color: "#075fed", marginRight: "20px", paddingLeft: "5px", paddingRight: "5px" }}>3</div>
                        <div style={{ color: "#969696", fontWeight: "bold", marginRight: "20px" }}>PAYMENT OPTIONS</div>
                    </Paper>



                </div>

                <div className="Total" style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}>
                    <div className="Cart-total" style={{ fontFamily: '"Roboto",sans-serif', display: "flex", flexDirection: "column", position: "sticky", top: "20px", marginTop: "20px", maxHeight: "400px", maxWidth: "400px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)' }}>
                        <div className="Total-title" style={{ color: "#727375", paddingLeft: "70px", paddingTop: "10px", paddingRight: "70px" }}>
                            PRICE DETAILS
                        </div>
                        <div className="Total-divider" style={{ padding: "0px" }}><hr></hr></div>
                        <div className="Total-item" style={{ paddingTop: "5px", fontSize: "14px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>MRP ( {Products.length} Items )</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={mrp} /></div>
                        </div>
                        <div className="Total-item" style={{ paddingTop: "5px", fontSize: "14px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>Delivery Fee</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={deliveryFee} /></div>
                        </div>
                        <div className="Total-divider" style={{ padding: "0px" }}><hr></hr></div>
                        <div className="Total-amount" style={{ fontWeight: "bold", fontSize: "15px", paddingBottom: "10px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>Total Amount</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={totalAmount} /></div>

                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default AddressSelect