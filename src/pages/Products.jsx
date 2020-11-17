import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Navbar from "../components/Navbar/Navbar";
import { setProducts } from "../redux/action";

const PRODUCTS = gql`
  query Products($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;

const Products = () => {
  const currency = useSelector((state) => state.cart.currency);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const { data } = useQuery(PRODUCTS, { variables: { currency } });

  useEffect(() => {
    if (data) dispatch(setProducts(data?.products));
  }, [data, dispatch]);

  return (
    <>
      <Navbar />
      <Header />
      <Main loading={!products.length} />
    </>
  );
};

export default Products;
