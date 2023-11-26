import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbars from "./companent/navbar/Navbars";
import Footer from "./companent/footer/Footer";
import Home from "./companent/pages/Home/Home";
import Product from "./companent/pages/product/Product";
import Login from "./companent/pages/Login/Login";
import Register from "./companent/pages/Regsiter/Register";
import Contact from "./companent/pages/Contact/Contact";
import Drawer from "./companent/companent/Drawer/Drawer";
import Profile from "./companent/pages/Profile/Profile";
import UserAuth from "./companent/auth/Hoc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import OrderProcces from "./companent/pages/OrderProcces/OrderProcces";
import Vérificationpaiement from "./companent/pages/Vérification et paiement/Vérificationpaiement";
import Details from "./companent/pages/Profile/Details/Details";
import Setting from "./companent/pages/Profile/Setting/Setting";
import AdresseDefault from "./companent/pages/Profile/DefaultAdresse/AdresseDefault";
import DeleteAcount from "./companent/pages/Profile/DeleteAccount/DeleteAcount";
import CommandClient from "./companent/pages/Profile/CommandClient/CommandClient";
import UpdatePassword from "./companent/pages/Profile/updatepassword/UpdatePassword";
import Bubble from "./companent/companent/bubble/Bubble";
import ForgetPassword from "./companent/pages/forgetPassword/ForgetPassword";
import ForgetProcess from "./companent/pages/Login/forgetPass/ForgetProcess";
import EditAdresse from "./companent/pages/Profile/DefaultAdresse/Editadresse/EditAdresse";
import { useSelector } from "react-redux";
import ProfileAdmin from "./companent/ADMIN/profile/ProfileAdmin";
import Clientlist from "./companent/ADMIN/clients/Client-list";
import SettingAd from "./companent/ADMIN/setting/SettingAd";
import ProductLIstSells from "./companent/ADMIN/productlist/ProductLIstSells";
import Admin from "./companent/ADMIN/Admin";
import AddingNewProdcut from "./companent/ADMIN/addNew/AddingNewProdcut";
import Order from "./companent/ADMIN/Delivery/order/Order";
import Delivery from "./companent/ADMIN/Delivery/Delivery";
import UpdateAdminProfile from "./companent/ADMIN/setting/updateProfile/updateAdminProfile";
import UpdateAdminPAssword from "./companent/ADMIN/setting/UpdatePassword/updateAdminPAssword";
import { ModifyProduct } from "./companent/ADMIN/edit-product/ModifyProduct";
import "./theme/dark.scss";
import "./App.scss";
import { SkeletonTheme } from "react-loading-skeleton";
import VerifyAccounte from "./companent/pages/Profile/VerifyAccounte/VerifyAccounte";
import ProdcutLayout from "./companent/pages/Home/ProdcutLayout/ProdcutLayout";
import Commande from "./companent/pages/Profile/CommandClient/command/Commande";
import DetailsOrders from "./companent/pages/Profile/CommandClient/command/list-commande/DetailsOrders";
const Layout = () => {
  const alert = useSelector((state) => state.alert.alert);
  const mode = window.matchMedia;
  return (
    <div className={false ? `App dark` : "App"}>
      <Navbars />
      <Bubble />
      <Drawer />
      <Outlet />
      <Footer />
      <Contact />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/produits/:category",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <ProdcutLayout />
            </Suspense>
          ),
        },
        {
          path: "/produit/:id",
          element: (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Product />
            </Suspense>
          ),
        },
        {
          path: "/connexion",
          element: <Login />,
        },
        {
          path: "/profile/:id",
          element: <UserAuth element={Profile} />,
        },

        {
          path: "/creation de compte",
          element: <Register />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/votre-pannier",
          element: <UserAuth element={OrderProcces} />,
        },
        {
          path: "/Verification",
          element: <UserAuth element={Vérificationpaiement} />,
        },
        {
          path: "/profile-admin/",
          element: <UserAuth element={Admin} />,
          children: [
            {
              path: "",
              element: <ProfileAdmin />,
            },
            {
              path: "client-list",
              element: <Clientlist />,
            },
            {
              path: "sells",
              element: <ProductLIstSells />,
            },
            {
              path: "update-product/:id",
              element: <ModifyProduct />,
            },
            {
              path: "setting-admin",
              element: <SettingAd />,
              children: [
                {
                  path: "",
                  element: <UpdateAdminProfile />,
                },
                {
                  path: "update-password",
                  element: <UpdateAdminPAssword />,
                },
              ],
            },
            {
              path: "ajoute",
              element: <AddingNewProdcut />,
            },
            {
              path: "client-list/order/:id",
              element: <Order />,
            },
            {
              path: "les-commandes",
              element: <Delivery />,
            },
            {
              path: "les-commandes/order/:id",
              element: <Order />,
            },
          ],
        },
        {
          path: "reset-password",
          element: <ForgetPassword />,
        },
        {
          path: "forget-password",
          element: <ForgetProcess />,
        },
        {
          path: "/profile/:id",
          element: <UserAuth element={Profile} />,
          children: [
            {
              path: "",
              element: <UserAuth element={Details} />,
            },
            {
              path: "commande/:type",
              element: <UserAuth element={CommandClient} />,
              children: [
                {
                  path: "",
                  element: <Commande />,
                },
                {
                  path: "list-commandes",
                  element: <DetailsOrders />,
                },
              ],
            },

            {
              path: "setting",
              element: <UserAuth element={Setting} />,
            },
            {
              path: "adreese",
              element: <UserAuth element={AdresseDefault} />,
            },
            {
              path: "delete",
              element: <UserAuth element={DeleteAcount} />,
            },
            {
              path: "update-password",
              element: <UserAuth element={UpdatePassword} />,
            },
            {
              path: "adreese/update-adresse",
              element: <UserAuth element={EditAdresse} />,
            },
            {
              path: "verify-accounte",
              element: <UserAuth element={VerifyAccounte} />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <GoogleOAuthProvider clientId="648490929847-l0v62v1c3fus1k7id2c7ug20tr6rt28m.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </SkeletonTheme>
  );
}

export default App;
