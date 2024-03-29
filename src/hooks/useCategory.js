import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config/config";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  // get all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/category/all`);
      if (res.data.status) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return categories;
};
