import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import Product from "../components/Product";

const Search = () => {
  const { values, setValues } = useSearch();
  return (
    <Layout title="Search results">
      <div className="space"></div>
      <div className="container-fluid">
        <div className="row">
          <p className="text-center">
            {values?.result && values?.result.length < 1
              ? "No Products found"
              : values?.result?.length &&
                `${values?.result?.length} Products found.`}
          </p>
          {values.result?.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
