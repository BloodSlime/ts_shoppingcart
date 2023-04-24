import { useSelector } from "react-redux";
import "../styles/css/Cart.css";
import { Item, CartType, ADD, DELETE } from "../reducer";
import { useAppDispatch } from "../store";

const Cart = () => {
  const cartItems = useSelector((state: CartType) => state.items);
  const totalCost = useSelector((state: CartType) => state.totalCost);
  const dispatch = useAppDispatch();

  console.log(cartItems);

  const addToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: string,
    title: string,
    id: number,
    amount: number,
    cost: number
  ) => {
    e.preventDefault();

    dispatch(ADD({ image, title, id, amount, cost }));
  };

  const deleteFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    cost: number
  ) => {
    e.preventDefault();

    dispatch(DELETE({ title, cost }));
  };

  return (
    <div className="shopping-cart">
      <h2>Your Cart</h2>
      <div className="cart-content">
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map((item: Item) => {
          console.log(item.image);
          return (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt="paicture" />
              <p>
                {item.title.length < 24
                  ? item.title
                  : item.title.slice(0, 21) + "..."}
              </p>
              <div className="button-area">
                <button
                  onClick={(e) =>
                    addToCart(e, item.image, item.title, item.id, 1, item.cost)
                  }
                >
                  +
                </button>
                <p>{item.amount}</p>
                <button
                  onClick={(e) => deleteFromCart(e, item.title, item.cost)}
                >
                  -
                </button>
                <h4>${item.cost * item.amount}</h4>
              </div>
            </div>
          );
        })}
        {cartItems.length === 0 ? null : (
          <div
            style={{
              display: "block",
              width: "fit-content",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            Your total: ${totalCost.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
