import { Link } from "react-router-dom";
import FormatPrice from "../Helper/FormatPrice";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


function ProductCard(props) {

    return (
        <>
            <div className="col">
                <Link to={`/productdetails/${props.id}`} className="card h-100" style={{
                    textDecoration: "none", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    borderRadius: "0px"
                }}>
                    <img src={props.image} className="card-img-top p-3" style={{ height: "200px", objectFit: "contain" }} alt="Product Image" />
                    <div className="card-body d-flex flex-column" style={{ height: "100px" }}>
                        <h7 className="card-title flex-grow-1" style={{fontSize:"15px",fontFamily:'"Roboto",sans-serif'}}>{props.brand} {props.name}</h7>
                        <div className="d-flex border-top justify-content-between" style={{marginBottom:"-8px"}}>
                            <p className="card-text my-0 mt-0" style={{ fontSize:"13px", fontWeight: "bold", marginTop: "O" }} ><FormatPrice price={props.price} /></p>
                            <div className="cart" onClick={() => addToCart()} style={{ color: "black"}}><AddShoppingCartIcon /></div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}
export default ProductCard;