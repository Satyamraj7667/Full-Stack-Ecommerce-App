import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


function LoggingIcon() {
 
  const navigate = useNavigate();
  const HandleClick = () =>{
    navigate("/login");
  }

 
  return (
    <Button onClick={HandleClick} color='primary' variant='contained' style={{padding:"0px"}}>Login
    </Button>
  )
}

export default LoggingIcon