import { useSelector } from "react-redux";
import Product from "../Product/Product";
import style from "./Main.module.css";
import Cart from "../Cart/Cart";
import { memo } from "react";
import Loader from "../Loader/Loader";

const Main = ({ loading }) => {
  const openedCart = useSelector((state) => state.cart.cartIsOpened);
  const products = useSelector((state) => state.cart.products);

  return (
    <main className={style.main}>
      <div className="container">
        <div className={style.items}>
          {loading ? (
            <div className={style.cover}>
              <Loader cover />
            </div>
          ) : (
            products?.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
          {openedCart && <Cart />}
        </div>
      </div>
    </main>
  );
};

export default memo(Main);
