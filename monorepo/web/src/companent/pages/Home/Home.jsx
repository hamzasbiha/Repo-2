import React, { useEffect } from "react";
import "./Home.scss";
import FeaturedProducts from "../../companent/featuredProuducts/FeaturedProducts";
import Banner from "../../companent/banner/Banner";
import Announcement from "../../companent/announcement/Announcement";
import { fetchUserApi } from "../../../redux/client/ClientSlice";
import { useDispatch } from "react-redux";
import { fetchSingleCart } from "../../../redux/cartSlice";
import { useSelector } from "react-redux";
import ProdcutLayout from "./ProdcutLayout/ProdcutLayout";
import MapStore from "../../Map/MapStore";
import { ToastContainer } from "react-toastify";
import GridLayoutFilter from "../../companent/GridLayoutFilter/GridLayoutFilter";
const Home = () => {
  const dispatch = useDispatch();
  let token = sessionStorage.getItem("access");

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserApi(token));
      dispatch(fetchSingleCart({ id: user.id, token: token }));
    }
  }, [token]);
  return (
    <>
      <Banner />
      <ToastContainer />
      <FeaturedProducts type={"new"} />
      <GridLayoutFilter />
      <ProdcutLayout />
      <Announcement />
      <FeaturedProducts type={"trending"} />
      <MapStore />
    </>
  );
};

export default Home;
