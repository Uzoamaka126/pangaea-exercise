import { useEffect, useRef, useCallback, useMemo,memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import style from "./Cart.module.css";
import { ReactComponent as BackIcon } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as CancelIcon } from "../../assets/icons/cancel.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import {
  setProducts,
  setCurrency,
  toggleCart,
  updateCart,
} from "../../redux/action";
import formatCurrency from "../../utils/format";
import Loader from "../Loader/Loader";
import sleep from "../../utils/timeout";

// queries
const CURRENCY = gql`
  query currency {
    currency
  }
`;
const PRODUCT_PRICE = gql`
  query Products($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

const Cart = memo(() => {
  const cart = useSelector((state) => state.cart.cart);
  const currency = useSelector((state) => state.cart.currency);

  const node = useRef();

  const dispatch = useDispatch();
  const { data, loading: currencyLoading } = useQuery(CURRENCY);
  const [getPrice, { data: price, loading }] = useLazyQuery(PRODUCT_PRICE, {
    variables: { currency },
  });

  const closeCart = useCallback(async () => {
    const cartContent = document.getElementById("cartContent");
    if (cartContent) {
      cartContent.style.transform = "translateX(700px)"
       await sleep(300);
    }
    const cart = document.getElementById("cart");
    if (cart) {
      cart.style.opacity = 0
      await sleep(800);
    }
    dispatch(toggleCart(false));
  }, [dispatch]);

  useEffect(() => {
    if (price) {
      dispatch(setProducts(price?.products));
    }
  }, [price, dispatch]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  const handleClick = useCallback(
    (e) => {
      if (node.current?.contains(e.target)) {
        return;
      }
      // outside click
      closeCart();
    },
    [node, closeCart]
  );
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  const handleChangeCurrency = useCallback(
    (e) => {
      dispatch(setCurrency(e.target.value));
      getPrice();
    },
    [getPrice, dispatch]
  );

  const subTotal = useMemo(() => {
    const subtotal = cart.reduce(
      (accumulator, current) =>
        (accumulator += current.quantity * current.price),
      0
    );
    return subtotal;
  }, [cart]);

  return (
    <div id="cart" className={style.cart}>
      <div ref={node} id="cartContent" className={style.cartContent}>
        <div className={style.cartHeader}>
          <button onClick={closeCart}>
            <BackIcon width={20} height={20} />
          </button>
          <h6>Your cart</h6>
        </div>
        {currencyLoading ? (
          <Loader />
        ) : (
          <div className={style.cartSelect}>
            <select
              onChange={handleChangeCurrency}
              value={currency}
              name="currency"
              id="currency"
            >
              {data?.currency?.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={style.cartBody}>
          {cart.length ? (
            cart?.map((cartItem) => (
              <div key={cartItem.id} className={style.cartCard}>
                <h6>{cartItem?.title}</h6>
                <button
                  onClick={() =>
                    dispatch(updateCart({ cartItem, operation: "remove" }))
                  }
                  className={style.cartCancel}
                >
                  <CancelIcon width={10} height={10} />
                </button>

                <div className={style.cartItem}>
                  <img src={cartItem?.image_url} alt="product" />
                  <div>
                    <div className={style.cartCounter}>
                      <button
                        onClick={() =>
                          dispatch(updateCart({ cartItem, operation: "minus" }))
                        }
                      >
                        <MinusIcon width={10} height={10} />
                      </button>
                      <span>{cartItem?.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(updateCart({ cartItem, operation: "add" }))
                        }
                      >
                        <PlusIcon width={10} height={10} />
                      </button>
                    </div>

                    <p>
                      {loading ? (
                        <Loader />
                      ) : (
                        formatCurrency(
                          cartItem?.price * cartItem?.quantity,
                          currency
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items yet</p>
          )}
        </div>

        <div className={style.cartFooter}>
          <div>
            <p>Subtotal</p>
            <p> {loading ? <Loader /> : formatCurrency(subTotal, currency)}</p>
          </div>

          <button>Make this a subscription (Save 20%)</button>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
