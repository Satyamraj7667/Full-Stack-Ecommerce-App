import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { Link } from "react-router-dom";
import FormatPrice from "../Helper/FormatPrice";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "./../Store/cartSlice";
import { getCurrentUserEmail } from "../Auth";
import { Label } from "@mui/icons-material";


function Home() {

    const [products, setProducts] = useState([]);

    const getAllProducts = () => {
        axios.get(`http://localhost:8081/product`).then(
            (response) => {
                setProducts(response.data);

            },
            (error) => {
                console.log(error);
            }

        )
    }
    useEffect(() => {
        getAllProducts();
        dispatch(fetchCart());

    }, [])

    const userEmail = getCurrentUserEmail();

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart({ product }));
    };
    const [selectedBrand, setSelectedBrand] = useState("");
    const uniqueBrands = [...new Set(products.map((product) => product.brand))]; // Get unique brands
    const handleBrandFilterChange = (event) => {
        setSelectedBrand(event.target.value); // Update selected brand on filter change
    };
    const filteredProducts = selectedBrand ? products.filter(product => product.brand === selectedBrand) : products;

    return (
        <>
            <Navbar />
            <div className="flex-container mt-4" style={{ margin: "15px", justifyContent: "flex-start" }}>
                <div className="row">
                    <Paper className="col-md-3 border-end" style={{ fontFamily: '"Roboto", sans-serif' }}>
                        {/* <h3>Filters</h3>
                        <label>Brands</label>
                        <select value={selectedBrand} onChange={handleBrandFilterChange}>
                            <option value="">All Brands</option>
                            {/* Dynamically populate unique brands */}
                            {/* {uniqueBrands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))} */}
                        {/* </select>  */}
                        <h3>Filters</h3>
                        <br/>
                        <label>Select Brand</label>
                        <FormControl sx={{ m: 1, minWidth: 260 }} size="small">
                            <InputLabel id="demo-select-small-label">Brands</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Brands"
                                
                                value={selectedBrand} onChange={handleBrandFilterChange}
                            >
                                <MenuItem value="">
                                    <em>All Brands</em>
                                </MenuItem>
                                {uniqueBrands.map((brand) => (
                                <MenuItem key={brand} value={brand}>
                                    {brand}
                                </MenuItem>
                            ))}
                                
                            </Select>
                        </FormControl>
                    </Paper>

                    <div className="col-md-9">
                        < div className="row row-cols-1 row-cols-md-4 g-4">
                            {filteredProducts.length > 0
                                ? filteredProducts.map((item) =>
                                    <div className="col">
                                        <div className="card h-100 " style={{
                                            padding: "0px",
                                            textDecoration: "none", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                            borderRadius: "0px"
                                        }}>
                                            <Link to={`/productdetails/${item.id}`}>
                                                <img src={`http://localhost:8081/product/image/${item.photo}`} className="card-img-top p-3" style={{ height: "200px", objectFit: "contain" }} alt="Product Image" />
                                            </Link>
                                            <div className="card-body d-flex flex-column" style={{ height: "100px" }}>
                                                <h7 className="card-title flex-grow-1" style={{ fontSize: "14px", fontFamily: '"Roboto",sans-serif' }}>{item.brand} {item.name.substring(0, 40) /* Limit to 20 characters */}
                                                    {item.name.length > 20 && "..."}</h7>
                                                <div className="d-flex border-top justify-content-between" style={{ marginBottom: "-8px", alignItems: "center" }}>
                                                    <p className="card-text my-0 mt-0" style={{ fontSize: "13px", fontWeight: "bold" }} ><FormatPrice price={item.price} /></p>
                                                    <IconButton size="small" sx={{ padding: "0px", marginTop: "2px" }} onClick={() => handleAddToCart(item)} ><AddShoppingCartIcon /></IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                : "No Products"}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>

    );
}
export default Home;
