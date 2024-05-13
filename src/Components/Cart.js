import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FormatPrice from "../Helper/FormatPrice";
import { changeCartItemQuantity, fetchCart, removeFromCart } from "../Store/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




function Cart() {

   
    const Products = useSelector((store) => store.cart.cartItems);
    const DeliveryFee = 50;
    const [finalAmount, setFinalAmount] = useState();

    const dispatch = useDispatch();
    const handleRemove = (productId) => {
        dispatch(removeFromCart({ productId }));
    }

    const handleDecrement = (productId) =>{
        dispatch(changeCartItemQuantity({ productId, increment: false }));
       
    }

    const handleIncrement = (productId) =>{
        dispatch(changeCartItemQuantity({ productId, increment: true }));
    }

    const findTotal = () =>{
        let totalPrice = 0;
        for(let i=0;i<Products.length;i++){
            const item = Products[i];
            const itemTotal = item.product.price*item.cartQuantity;
            totalPrice += itemTotal;
        }
        setFinalAmount(totalPrice);
    }
   
    useEffect(() => {
        findTotal();
    }, [Products]);


    const navigate = useNavigate();
    const handleContinue = () => {
        

        // Send cart details to the next component using useNavigate
        navigate("/user/addressSelect", {
          state: {
            cart: Products,
            totalAmount: finalAmount + DeliveryFee,
            mrp: finalAmount,
            deliveryFee: DeliveryFee,
          },
        });
      
    }
    
    
    


    return (
        <>
            <Navbar />
            <div className="flex-container" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap-reverse" }}>
                <div className="Cart-item" style={{ marginLeft: "10px", marginRight: "10px", width: "750px", marginTop: "20px", marginBottom: "20px" }} >
                    {Products.length > 0
                        ? Products.map((item,index) =>
                            <div div className='Cart-item' style={{
                                display: "flex", justifyContent: "space-evenly", padding: "10px", marginBottom: "20px",
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', fontFamily: '"Roboto",sans-serif'
                            }}>
                                <div className='Item-photo'>
                                    <img src={`http://localhost:8081/product/image/${item.product.photo}`} alt="" style={{ maxHeight: "100px", Width: "100px" }} />
                                </div>

                                <div className="Item-details" style={{ marginLeft: "5px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <div className="Item-name" style={{ fontSize: "14px" }}>
                                       {item.product.brand} {item.product.name}
                                    </div>
                                    <div className="Item-price" style={{ fontWeight: "bold" }}><FormatPrice price={item.product.price}/></div>

                                </div>
                                <div className="Item-count" style={{ display: "flex", alignItems: "center" }}>
                                    <IconButton onClick={() => handleDecrement(item.product.id)} sx={{padding:"0px",color:"black"}}><IndeterminateCheckBoxIcon /></IconButton>
                                    <div style={{padding:"2px"}}>{item.cartQuantity}</div>
                                    <IconButton onClick={() => handleIncrement(item.product.id)} sx={{padding:"0px",color:"black"}}><AddBoxIcon/></IconButton>
                                </div>

                                <div className="Item-remove" style={{ alignContent: "center" }}>
                                    <Button onClick={() => handleRemove(item.product.id)} color="error"><DeleteIcon />Remove</Button>
                                </div>
                            </div>
                        ) 
                        :  "No Products"}
                    
                 </div>

                 {Products.length > 0 && (
                <div className="Total" style={{ display: "flex", flexDirection: "column" }}>
                    <div className="Cart-total" style={{ fontFamily: '"Roboto",sans-serif', display: "flex", flexDirection: "column", position: "sticky", top: "20px", marginTop: "20px", maxHeight: "400px", maxWidth: "400px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)' }}>
                        <div className="Total-title" style={{ color: "#727375", paddingLeft: "70px", paddingTop: "10px", paddingRight: "70px" }}>
                            PRICE DETAILS
                        </div>
                        <div className="Total-divider" style={{ padding: "0px" }}><hr></hr></div>
                        <div className="Total-item" style={{ paddingTop: "5px", fontSize: "14px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>MRP ( {Products.length} Items )</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={finalAmount}/></div>
                        </div>
                        <div className="Total-item" style={{ paddingTop: "5px", fontSize: "14px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>Delivery Fee</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={DeliveryFee}/></div>
                        </div>
                        <div className="Total-divider" style={{ padding: "0px" }}><hr></hr></div>
                        <div className="Total-amount" style={{ fontWeight: "bold", fontSize: "15px", paddingBottom: "10px", paddingLeft: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>Total Amount</div>
                            <div style={{ paddingRight: "10px" }}><FormatPrice price={finalAmount+DeliveryFee}/></div>

                        </div>

                    </div>
                    <div className="Continue mt-3" style={{ position: "sticky", top: "212px", marginBottom: "60px" }}>
                        <Button onClick={handleContinue} color="warning" variant="contained" style={{ width: "100%" }}>continue</Button>
                    </div>
                </div>
                 )}

            </div >
            <Footer />
        </>
    )
}

export default Cart