import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AdminSidebar from "./admin/AdminSidebar";
import axios from "axios";
import config from "../config/config";
import { Link, useParams } from "react-router-dom";
import { numberFormat } from "../helpers/Helper";
import Product from "../components/Product";
import { useCategory } from "../hooks/useCategory";

const AllCategories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Cagegories | Ecom 2024">
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-12">
            <h2 className="pt-5 pb-3"> All Categories</h2>
            <div className="row">
              {categories.length === 0 ? (
                <h6 className="">No categories found.</h6>
              ) : (
                categories?.map((category) => (
                  <div key={category._id} className="col-md-3">
                    <div className="card mx-1 mb-4">
                      <Link
                        to={`/category/${category.slug}`}
                        className="card-body category-parent-div text-decoration-none"
                      >
                        <p className="category-name">{category.name}</p>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllCategories;
