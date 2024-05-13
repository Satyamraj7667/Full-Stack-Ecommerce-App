import { useParams } from "react-router-dom";
import img1 from "../Assets/Images/img1.jpg";
import img2 from "../Assets/Images/img2.jpg";
import img3 from "../Assets/Images/img3.jpg";
import DarkButton from "./DarkButton";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import FormatPrice from "../Helper/FormatPrice";


function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getSingleProduct = () => {
    axios.get(`http://localhost:8081/product/${id}`)
      .then(
        (response) => {
          setProduct(response.data);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }

      )
  }

  useEffect(() => {
    getSingleProduct();
  }, [])

  if (!product) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">

          <div className="col-lg-6 col-md-12">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={`http://localhost:8081/product/image/${product.photo}`} class="d-block w-100" alt="product" style={{ maxHeight: "350px", objectFit: "contain", maxWidth:"100%" }} />
                </div>
                <div className="carousel-item">
                  <img src={img1} class="d-block w-100" alt="..." style={{ maxHeight: "350px", objectFit: "contain", maxWidth:"100%" }} />
                </div>
                <div className="carousel-item">
                  <img src={img2} class="d-block w-100" alt="..." style={{ maxHeight: "350px", objectFit: "contain", maxWidth:"100%" }} />
                </div>
                <div className="carousel-item">
                  <img src={img3} class="d-block w-100" alt="..." style={{ maxHeight: "350px", objectFit: "contain", maxWidth:"100%" }} />
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev" style={{ color: "black" }}>
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between mt-3 border-bottom" style={{ position: "relative" }} >
            <h3 style={{fontFamily:"sans-serif"}}>{product.brand} {product.name}</h3>
            <h5 style={{fontFamily:"revert-layer"}}><FormatPrice price={product.price} /></h5>
            <div className="darkbutton mb-2 mt-auto">
              <DarkButton title="Add to cart" />
            </div>
          </div>
          <div className="row my-5 border border-start-0 border-end-0" >
            <div classNam ="col-md-3" style={{fontSize:"15px"}}>
              <h8>Description </h8>
            </div>
            <div className="col-md-9" style={{fontSize:"13px"}}>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>




    </>
  )

}
export default ProductDetails;