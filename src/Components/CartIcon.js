import { ShoppingCartOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from '../Store/cartSlice';

function CartIcon() {
  const navigate = useNavigate();
 
  const HandleCartClick = () => {
   navigate("/user/cart");
  };

  const cartItems = useSelector((store) => store.cart.cartItems);
  const totalItems = cartItems.length;


  return (
    <div
      style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        
      }}
      onClick={HandleCartClick}
    >
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '6px',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '10px',
          padding:"1px"
        }}
      >
        {totalItems}
      </div>
      <div style={{fontSize:"22px"}}><ShoppingCartOutlined/></div>
    </div>
  );
}

export default CartIcon;
