import { parseCookies } from "nookies";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useState } from "react";

const Cart = ({ error, products }) => {
    const { token } = parseCookies()
    const router = useRouter()
    const [cartProduct, setCartProduct] = useState(products)
    let price = 0
    const deleteCart = async () => {
        const res = await fetch(`http://localhost:3000/api/cart`, {
            method: "DELETE"
        })
        await res.json()
        router.push('/')
    }

    if (!token) {
        return (
            <div className="center-align">
                <h3>Please login to view your cart</h3>
                <Link href="/login"><a><button className="btn">Login</button></a></Link>
            </div>
        )
    }

    if (error) {
        M.toast({ html: error, classes: "red" })
        jsCookie.remove("user")
        jsCookie.remove("token")
        router.push('/login')

    }



    const CartItems = () => {
        return (
            <>
                {cartProduct.map(item => {
                    price = (price + (item.quantity * item.product.price))
                    return (
                        <>
                            <div style={{ display: "flex", margin: "20px" }}>
                                <img src={item.product.imgURL} style={{ width: "30%" }} />

                                <div style={{ marginLeft: "20px", marginTop: "250px" }}>
                                    <h6>{item.product.name}</h6>
                                    <h6>{item.quantity} x {item.product.price}</h6>

                                </div>
                            </div>
                        </>
                    )
                })}
                <button className="btn waves-effect waves-light #c62828 red darken-3" onClick={() => deleteCart()}>Clear Cart
                    <i className="material-icons right">delete</i>
                </button>
            </>
        )
    }

    const TotalPrice = () => {
        return (
            <div className="container">
                <h5>Total $ {price / 2}</h5>
                <button className="btn">
                    Checkout
                </button>
            </div>
        )
    }

    return (

        <div className="container" >
            <CartItems />
            <TotalPrice />
        </div>

    )
}
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    if (!token) {
        return {
            props: { products: [] }
        }
    }
    const res = await fetch(`http://localhost:3000/api/cart`, {
        headers: {
            "Authorization": token
        }
    })
    const products = await res.json()
    if (products.error) {
        return {
            props: { error: products.error }
        }
    }
    console.log("products", products)
    return {
        props: { products }
    }
}

export default Cart