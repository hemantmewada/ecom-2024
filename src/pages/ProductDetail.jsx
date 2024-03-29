import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AdminSidebar from "./admin/AdminSidebar";
import axios from "axios";
import config from "../config/config";
import { useParams } from "react-router-dom";
import { numberFormat } from "../helpers/Helper";
import Product from "../components/Product";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { cart, setCart } = useCart();
  const addToCart = (singleCart) => {
    setCart([...cart, singleCart]);
    localStorage.setItem("cart", JSON.stringify([...cart, singleCart]));
    toast.success("Product is added to cart.");
  };
  const params = useParams();
  const [product, setpProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoadingRelatedProducts, setIsLoadingRelatedProducts] = useState([]);

  // get single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/product/single/${params.slug}`
      );
      if (res.data.status) {
        setpProduct(res.data.data);
        getRelatedProducts(res.data.data._id, res.data.data.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // related products
  const getRelatedProducts = async (productId, categoryId) => {
    try {
      setIsLoadingRelatedProducts(true);
      const res = await axios.get(
        `${config.BASE_URL}/product/related/${productId}/${categoryId}`
      );
      if (res.data.status) {
        setRelatedProducts(res.data.data);
      }
      setIsLoadingRelatedProducts(false);
    } catch (error) {
      setIsLoadingRelatedProducts(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  return (
    <Layout title="Product Detail | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-12">
            <div className="card w-100 p-3">
              <h2 className="pb-5"> Product Details</h2>
              {product.name && (
                <div className="row">
                  <div className="col-md-4 text-center">
                    {product._id && (
                      <img
                        className="object-fit-contain border rounded"
                        width="50%"
                        alt="not found"
                        src={`${config.BASE_URL}/product/single-image/${product._id}`}
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <p className="text-uppercase category-name">
                      {product?.category.name}
                    </p>
                    <h4>{product.name}</h4>
                    <hr />
                    <p>{product.description}</p>
                    <h5>{numberFormat(product.price)}</h5>
                    <div className="space"></div>
                    <button
                      type="button"
                      className="btn btn-outline-success text-uppercase"
                      onClick={() => addToCart(product)}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              )}
            </div>
            <h2 className="pt-5 pb-3"> Related Products</h2>
            <div className="row">
              {relatedProducts.length === 0 ? (
                <h6 className="">No related products were found.</h6>
              ) : (
                relatedProducts?.map((product) => (
                  <Product product={product} key={product._id} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
