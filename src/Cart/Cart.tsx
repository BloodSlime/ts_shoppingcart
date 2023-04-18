import { useSelector } from "react-redux"
import '../styles/css/Cart.css'
import { Item, CartType } from "../reducer"

const Cart = () => {
    const cartItems= useSelector((state: CartType) => state.items)

    console.log(cartItems)

    return <div className="shopping-cart">
        <h2>Your Cart</h2>
        <div className="cart-content">
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map((item: Item) => {
                console.log(item.image)
                return <div className="cart-item" key={item.id}>
                    <img src={item.image} alt='paicture'/>
                    <p>{item.title.length < 24 ? item.title : item.title.slice(0, 21)+'...'}</p>
                    <div className="button-area">
                        <button>+</button>
                        <p>{item.amount}</p>
                        <button>-</button>
                        <h4>${item.cost*item.amount}</h4>
                    </div>
                    
                </div>
            })}
        </div>
    </div>
}

export default Cart