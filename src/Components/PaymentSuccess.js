import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearCart } from "../Store/cartSlice";





function PaymentSuccess() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]); // Empty dependency array for one-time execution

  const navigate = useNavigate();
  const handleShopMoreClick = () =>{
    navigate("/");
  }
  const handleOrderClick = () =>{
    navigate("/user/orders");
  }

  return(
  <>
    <div className="container" style={{ display: "flex", justifyContent: "center",flexDirection:"column", padding: "30px" }}>
      <h2>Payment Successfull</h2>
      <div style={{ display: 'flex', flexDirection: "column" }}>
       <Button variant="contained" onClick={handleShopMoreClick} sx={{margin:"10px", width:"30%"}}>Shop More Products</Button>
       <Button variant= "contained" onClick={handleOrderClick} sx={{margin:"10px", width:"30%"}}>Go to your orders</Button>
      </div>
    </div>
  </>
  )
}
export default PaymentSuccess;