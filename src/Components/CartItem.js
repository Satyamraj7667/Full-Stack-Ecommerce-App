import img from "./../Assets/Images/JBL Tune 770NC.jpeg";
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
function CartItem() {
    return (
        <div className='Cart-item' style={{
            display: "flex",justifyContent:"space-evenly", padding:"10px",marginBottom:"20px",
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', fontFamily: '"Roboto",sans-serif'
        }}>
            <div className='Item-photo'>
                <img src={img} alt="" style={{ maxHeight: "100px", Width: "100px" }}/>
            </div>
            
            <div className="Item-details" style={{marginLeft:"5px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div className="Item-name" style={{fontSize:"14px"}}>
                 JBL Tune 770 Noise Cancelling Headphones                    
                </div>
                <div className="Item-price" style={{fontWeight:"bold"}}>₹10,000</div>

            </div>

            

            <div className="Item-count" style={{display:"flex",alignItems:"center"}}>
                <IndeterminateCheckBoxIcon/>
                <div className="count border-top border-bottom ">10</div>
                <AddBoxIcon/>
            </div>

            <div className="Item-remove" style={{alignContent:"center"}}>
              <Button color="error"><DeleteIcon/>Remove</Button>
            </div>
            




        </div>
    )
}

export default CartItem