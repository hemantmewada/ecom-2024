import React from "react";
import config from "../config/config";
import { numberFormat, shortStr } from "../helpers/Helper";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const { cart, setCart } = useCart();
  const addToCart = (singleCart) => {
    setCart([...cart, singleCart]);
    localStorage.setItem("cart", JSON.stringify([...cart, singleCart]));
    toast.success("Product is added to cart.");
  };
  return (
    <div className="col-md-3">
      <div className="card mx-1 mb-4">
        <img
          width="100%"
          height="200"
          className="object-fit-contain"
          src={`${config.BASE_URL}/product/single-image/${product._id}`}
          alt={product.name}
        />
        <div className="card-body">
          <p className="category-name">{product.category?.name}</p>
          <hr />
          <h5 className="card-title">{shortStr(product.name, 50)}</h5>
          <p className="card-text">{shortStr(product.description, 35)}</p>
          <h5>
            <b>{numberFormat(product.price)}</b>
          </h5>
          <div className="d-flex justify-content-between">
            <Link
              to={`/product/${product.slug}`}
              className="btn btn-outline-primary"
            >
              More Details
            </Link>
            <button
              type="buton"
              className="btn btn-outline-primary"
              onClick={() => addToCart(product)}
            >
              <FaCartShopping />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
