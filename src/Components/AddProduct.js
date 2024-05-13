import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        subcategory: "",
        description: "",
        quantity: "",
        price: ""
    })

    const [photo, setPhoto] = useState(null);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });

    }
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);

    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (photo==null) {
            toast.error("Please select an image to upload!");
            return; // Prevent further execution if no image is selected
        }
        const formData = new FormData();
        formData.append("image", photo);

         axios.post("http://localhost:8081/product", product).then(
            (response) => {
                

                const productId = response.data.id;

                console.log(productId);
                axios.post(`http://localhost:8081/product/image/upload/${productId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then(
                    (response) => {
                        toast.success("Product added successfully!");
                    },
                    (error) => {
                        toast.error("something went wrong");
                        console.log("error of inside");
                        console.log(error);
                        
                    }
                )
            },
            (error) => {
                toast.error("something went wrong!");
                console.log("error of outside");
                console.log(error);
            }
        )








    }

    return (
        <>
            <Toaster />
            <Navbar />

            <div className="container p-3" style={{ display: "flex", flexDirection: "column", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', fontFamily: '"Roboto",sans-serif', marginTop: "15px", marginBottom: "15px" }}>
                <h4>Add a new Product </h4>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <input type="text" name="name" placeholder="Enter title" className="form-control " value={product.name} onChange={handleChange} required />
                    </div>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <input type="text" name="brand" placeholder="Enter brand name" className="form-control " value={product.brand} onChange={handleChange} required />
                    </div>
                    <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
                        <input type="text" style={{ marginRight: "5px" }} name="category" placeholder="Enter category" className="form-control " value={product.category} onChange={handleChange} required />
                        <input type="text" name="subcategory" placeholder="Enter sub-category" className="form-control " value={product.subcategory} onChange={handleChange} required />
                    </div>

                    <div style={{ width: "100%", marginTop: "10px" }}>
                        <input type="text" name="description" placeholder="Enter descripton" className="form-control " value={product.description} onChange={handleChange} required />
                    </div>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <input type="number" name="price" placeholder="Enter price" className="form-control " value={product.price} onChange={handleChange} required />
                    </div>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <input type="number" name="quantity" placeholder="Enter quantity" className="form-control " value={product.quantity} onChange={handleChange} required />
                    </div>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <input type="file" name="photo" placeholder="Select Photo" onChange={handlePhotoChange} required />
                    </div>
                    <div style={{ marginTop: "10px", width: "50%" }}>
                        <Button type="submit" sx={{ width: "30%" }} variant="contained">submit</Button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default AddProduct