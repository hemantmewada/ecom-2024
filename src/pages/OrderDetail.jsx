import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import config from "../config/config";
import { numberFormat, shortStr } from "../helpers/Helper";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // calculate total price
  const totalPrice = () => {
    let total = 0;
    cart.map((c) => {
      total += c.price;
    });
    return total;
  };
  const remove = (singleCart) => {
    if (!confirm("Are you sure you want to remove this product from cart?")) {
      return false;
    }

    // that logic remove only on cart item because in splice we are giving only 1 parameter
    let myCart = [...cart];
    const index = myCart.findIndex((item) => item._id == singleCart._id);
    myCart.splice(index, 1);
    setCart(myCart);

    // it filters all the data with same cart _id
    // const cartData = cart.filter((c) => c._id != singleCart._id);
    // setCart(cartData);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // get token
  const getClientToken = async () => {
    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/payment/braintree/token`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.clientToken) {
        setClientToken(data?.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const res = await axios.post(
        `${config.BASE_URL}/payment/braintree/payment`,
        { cart, nonce },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (res.data.status) {
        console.log(res.data.message);
        toast.success(res.data.message);
        setCart([]);
        localStorage.removeItem("cart");
        setTimeout(() => {
          navigate(
            `/dashboard/${
              auth?.user?.role == "admin" ? "admin" : "user"
            }/orders`
          );
        }, 700);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title="Cart | Ecom 2024">
      <div className="space"></div>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <h2 className="pb-3">
                Shopping Cart {cart.length > 0 && `(${cart.length})`}
              </h2>
              {cart.length === 0 && <p>There are no items in your cart.</p>}
              {cart.map((c) => (
                <div key={c._id} className="card p-2 mb-3">
                  <div className="row">
                    <div className="col-md-2">
                      <Link to={`/product/${c.slug}`}>
                        <img
                          className="rounded"
                          width={"100%"}
                          src={`${config.BASE_URL}/product/single-image/${c._id}`}
                          alt={c.name}
                        />
                      </Link>
                    </div>
                    <div className="col-md-9">
                      <p className="category-name">{c.category.name}</p>
                      <h4>{c.name}</h4>
                      <p>{shortStr(c.description, 150)}</p>
                      <h5>
                        <b>{numberFormat(c.price)}</b>
                      </h5>
                    </div>
                    <div className="col-md-1 d-flex justify-content-end align-items-start">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => remove(c)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <div className="card w-100 p-3">
              <p className="text-uppercase">Price Details</p>
              <div className="d-flex justify-content-between">
                <p>Total MRP</p>
                <p>{numberFormat(totalPrice())}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Discount on MRP</p>
                <p>₹0</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Delivery Charges</p>
                <p>FREE</p>
              </div>
              <div className="d-flex justify-content-between order-total">
                <p>Order Total</p>
                <p>{numberFormat(totalPrice())}</p>
              </div>
              <hr />
              {auth?.token ? (
                <div className="payment">
                  <p className="text-uppercase">other details</p>
                  <div className="d-flex justify-content-between">
                    <p>Delivery Address</p>
                    <Link
                      className="text-uppercase text-decoration-none clear-all"
                      to="/dashboard/home"
                    >
                      want to change?
                    </Link>
                  </div>
                  <p className="font-size-13">{auth?.user?.address}</p>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login", { state: "/cart" })}
                  type="button"
                  className="btn btn-outline-danger text-uppercase"
                >
                  back to login
                </button>
              )}

              {cart.length > 0 && clientToken && (
                <>
                  <hr />
                  <div className="p-2">
                    <DropIn
                      onError={(err) => setError(err)}
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary text-uppercase w-100"
                      onClick={handleCheckout}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "proceed to checkout"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
