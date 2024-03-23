import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </HelmetProvider>
  );
};

Layout.defaultProps = {
  title: "Ecom 2024",
  description: "ecommerce app with MERN stack.",
  keywords: "react, node, mongodb, next, express",
  author: "Hemant Mewada",
};
export default Layout;
