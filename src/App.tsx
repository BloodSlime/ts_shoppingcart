// import { useQuery } from "react-query";
import "./styles/css/App.css";
import Cart from "./Cart/Cart";
import { useAppDispatch } from "./store";
import { ADD } from "./reducer";
import axios from "axios";
import { useEffect, useState } from "react";

type Items = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

// const getData = async (): Promise<Items[]> => {
// return await (await fetch("https://fakestoreapi.com/products")).json();
// }

function App() {
  const [data, setData] = useState<Items[] | null>([]);
  // const { data, isLoading, error } = useQuery<Items[]>("products", getData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setData(response.data));
  }, []);

  console.log(data);

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

  return (
    <div className="App">
      <Cart />
      <div className="shopping-page">
        {data?.map((item: Items) => {
          return (
            <div className="item" key={item.id}>
              <div className="img-wrapper">
                <img src={item.image} alt={item.description} />
              </div>
              <h3>{item.title}</h3>
              <h3>${item.price}</h3>
              <div>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    addToCart(e, item.image, item.title, item.id, 1, item.price)
                  }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
