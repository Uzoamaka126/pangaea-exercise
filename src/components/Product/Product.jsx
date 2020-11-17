import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleCart } from "../../redux/action";
import formatCurrency from "../../utils/format";
import style from "./Product.module.css";

const Product = ({ product }) => {
  const currency = useSelector((state) => state.cart.currency);
  const dispatch = useDispatch();
  return (
    <div className={style.product}>
      <div href="/">
        <img
          className={style.productImage}
          src={product.image_url}
          alt="product"
        />
      </div>
      <p className={style.productName}>{product.title}</p>
      <p className={style.productPrice}>
        From {formatCurrency(product.price, currency)}
      </p>
      <button
        onClick={() => {
          dispatch(toggleCart(true));
          dispatch(addToCart(product));
        }}
        className={style.productButton}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default memo(Product);
