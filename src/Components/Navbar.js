import { Link, useNavigate } from "react-router-dom";
import img from "./../Assets/Images/Grab.png"
import { getCurrentUserFirstName, getCurrentUserRole, isLoggedIn } from "./../Auth";
import ProfileIcon from "./ProfileIcon";
import LoggingIcon from "./LoggingIcon";
import { Button } from "@mui/material";

function Navbar() {

  const name = getCurrentUserFirstName();
  const role = getCurrentUserRole();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/addproduct");
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ fontFamily: '"Roboto",open-sans' }}>

        <div className="container-fluid">
          <Link style={{ padding: "0px" }} className="navbar-brand" to="/">
            <img src={img} width={140} height={40} className="d-inline-block" alt="" />
          </Link>


          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {isLoggedIn() && role === "ADMIN" && (
                  <Button variant="contained" onClick={handleClick}>
                    Admin
                  </Button>
                )}
              </li>
              <li className="nav-item">

              </li>
              <li className="nav-item">

              </li>
            </ul>
          </div>
          <div>
            {isLoggedIn() ? <ProfileIcon name={name} /> : <LoggingIcon />}
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>



      </nav>
    </>
  )
}
export default Navbar;
