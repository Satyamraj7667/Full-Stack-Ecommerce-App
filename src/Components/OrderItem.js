import { Paper } from '@mui/material';
import img2 from "./../Assets/Images/samsung watch 4.jpeg";
import img1 from "./../Assets/Images/Pixel 7.jpeg";
import FormatPrice from "./../Helper/FormatPrice";
import Dot from "./Dot";

function OrderItem(props) {


  return (
    <div> <div className="order-item p-3" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.05)' }}>

    <div className="order-image" style={{marginLeft:"0px"}}>
        {props.orders.length > 1 ? (
            <>
                <div style={{ fontFamily: '"Roboto", sans-serif', fontSize: "17px", marginTop: "5px" }}>
                    <Paper style={{ fontSize: "13px" }}>
                        +{props.orders.orderProductIds.length - 1} More items
                    </Paper>
                </div>
            </>
        ) : (
            <>{props.orders.orderProductIds.length}</> // Replace with your image path
        )}
    </div>

    <div className="product-name " style={{ fontFamily: '"open-sans",sans-serif', fontSize: "14px", marginLeft: "10px", marginTop:"10px" }}>

        {props.arr.length > 1 ? (
            <>
                Group Buy ({props.arr.length} items)
            </>
        ) : (
            <>
                This is the name of the product
            </>
        )}
    </div>

    <div className="amount" style={{ fontSize:"15px",fontWeight:"bold",maxHeight:"50px",fontFamily:'"Roboto",sans-serif', marginLeft:"20px", marginTop:"5%"}}>
       
        <FormatPrice price={props.amount}/>

    </div>

    <div className="status" style={{ fontSize:"14px",fontWeight:"bold",fontFamily:'"Roboto",sans-serif', marginLeft:"30px", marginTop:"30px"}}>
       
        {props.status === "Delivered" ? (
           <>
           <Dot/>{props.status} on 24-03-2024
           </>
        ):
        (
            <>
           {props.status} on 24-03-2024
           </>
        )

        }

    </div>

</div>
</div>
  )
}

export default OrderItem