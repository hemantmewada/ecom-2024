import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import { numberFormat } from "../../helpers/Helper";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: {},
  quantity: "",
  productId: "",
};
const AdminShowProduct = () => {
  const params = useParams();
  const [product, setpProduct] = useState(initialValues);
  // get single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/product/single/${params.slug}`
      );
      if (res.data.status) {
        setpProduct({
          name: res.data.data.name,
          description: res.data.data.description,
          price: res.data.data.price,
          quantity: res.data.data.quantity,
          category: res.data.data.category,
          productId: res.data.data._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <Layout title="Admin Product Detail | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-2">
            <AdminSidebar />
          </div>
          <div className="col-md-10">
            <div className="card w-100 p-3">
              <h2 className="pb-5"> Product Details</h2>
              {product.name && (
                <div className="row">
                  <div className="col-md-6">
                    {product.productId && (
                      <img
                        className="object-fit-contain border rounded"
                        width="100%"
                        alt="not found"
                        src={`${config.BASE_URL}/product/single-image/${product.productId}`}
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <p className="text-uppercase category-name">
                      {product?.category.name}
                    </p>
                    <h4>{product.name}</h4>
                    <hr />
                    <p>{product.description}</p>
                    <h5>{numberFormat(product.price)}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminShowProduct;
