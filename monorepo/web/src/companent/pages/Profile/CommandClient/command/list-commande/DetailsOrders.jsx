import { useSelector } from "react-redux";
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import "./DetailsOrders.scss";
import { useNavigate } from "react-router-dom";

const DetailsOrders = () => {
  const cart = useSelector((state) => state.cart.currentUserCart);
  const user = useSelector((state) => state.user.user);
  const navgation=useNavigate()
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (user.accountType === "Personal") {
      cart.order_Items.forEach((item) => {
        totalPrice += item.priceForPersonal * item.QTE;
      });
    } else {
      cart.order_Items.forEach((item) => {
        totalPrice += item.priceForCompany * item.QTE;
      });
    }
    return totalPrice;
  };
  const totalPrice = calculateTotalPrice();
  console.log(cart);
  return (
    <div className="detil-order">
      <div className="top-section-comd">
      <div className="a-c">
      <span onClick={()=>navgation(-1)}>
      <ArrowBackIosNew fontSize="small" />
      </span>
      <b>Commande n° {cart.id}</b>
      </div>
        <span>
          Date Order At {new Date(cart.createdAt).toLocaleDateString()}
        </span>
        <span>Total price {totalPrice.toFixed(2)} </span>
        <span>
          {cart.order_Items.length}
          <span> Items</span>
        </span>
      </div>
      <div className="wrapper-det-orders">
        <div className="list-orders-client">
          {cart?.order_Items.map((item) => {
            const product = item.products;
            return (
              <div className="item-cart" key={item.id}>
                <div className="item-c">
                  <div className="image">
                    <img alt="" src={product.images[0]} />
                  </div>
                </div>
                <div className="item-c">
                  <div>
                    <h1>{product.title} </h1>
                    <p>{item.quantity_per_item} Qte </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="right-orders">
        <div className="w-r-o">
        <div className="details-payement">
            <h1>Payment</h1>
            <div className="list-details">
              <b>Payment method</b>
              <p>CASH payment on delivery</p>
              <b>Payment details</b>
              <p>subtotal: {cart.totalPrice}</p>
              <p>Shipping cost:7.00 TND</p>
              <p className="total-price-pay">Total:{cart.totalPrice + 7.0} </p>
            </div>
          </div>
          <div className="details-deliv">
            <h1>DELIVERY</h1>
            <div className="list-detiv-deliv">
              <b>Delivery method</b>
              <p>Home delivery</p>
            </div>
          </div>
          <div className="details-deliv">
            <h1>Delivery address</h1>
            <div className="list-detiv-deliv">
              <p>
                {cart.User.firstname} {cart.User.lastname}
              </p>
              <p>
                {cart.adresse}
                {cart.ville}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsOrders;
