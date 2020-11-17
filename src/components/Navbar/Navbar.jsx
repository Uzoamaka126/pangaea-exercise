import { useDispatch, useSelector } from "react-redux";
import {memo} from 'react'
import Cart from "../../assets/cart.png";
import Logo from "../../assets/logo.png";
import { toggleCart } from "../../redux/action";
import style from "./Navbar.module.css";

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const toggleCartFunc = (e) => {
    e.preventDefault();
    dispatch(toggleCart(true));
  };
  return (
    <nav className={style.nav}>
      <div className={style.navLeft}>
        <img src={Logo} alt="logo" />
        <a href="/">Shop</a>
        <a href="/">Learn </a>
      </div>

      <div className={style.navRight}>
        <a href="/">Account</a>
        <a onClick={toggleCartFunc} href="/">
          <img src={Cart} alt="logo" />
          <span>{cart.length}</span>
        </a>
      </div>
    </nav>
  );
});

export default Navbar;
