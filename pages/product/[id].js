import router from "next/router"
import { parseCookies } from 'nookies'
import { useState } from "react"

const Product = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const { token } = parseCookies()
    const { user } = parseCookies()
    const obj = user ? JSON.parse(user) : "empty"
    const deleteProduct = async () => {
        const res = await fetch(`http://localhost:3000/api/product/${product._id}`, {
            method: "DELETE"
        })
        await res.json()
        router.push('/')
    }
    const addToCart = async () => {
        const res = await fetch('http://localhost:3000/api/cart', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                quantity: quantity,
                productId: product._id
            })
        })
        const res2 = await res.json()
        console.log(res2);
        M.toast({ html: res2.message, classes: "green" })
    }
    return (
        <div className="container center-align">
            <h3>Product Code: {product.code}</h3>
            <img src={product.imgURL} />
            <h5>Name: {product.name}</h5>
            <h5>price: ${product.price}</h5>
            <input
                type="number"
                style={{ width: "400px", margin: "10px" }}
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
            />
            {user ?
                <>
                    <button className="btn waves-effect waves-light #37474f blue-grey darken-3" onClick={() => addToCart()} >Add
                        <i className="material-icons right">add</i>
                    </button><br></br>
                </>
                :
                <>
                    <button className="btn waves-effect waves-light red" onClick={() => router.push('/login')}>Login to Add
                        <i className="material-icons right">add</i>
                    </button><br></br>
                </>
            }

            {obj.role == "admin" &&
                <button className="btn waves-effect waves-light #c62828 red darken-3" onClick={() => deleteProduct()}>Remove
                    <i className="material-icons right">delete</i>
                </button>}

        </div>
    )

}




export async function getServerSideProps({ params: { id } }) {

    const res = await fetch(`http://localhost:3000/api/product/${id}`)
    const data = await res.json()
    return {
        props: { product: data },
    }
}

export default Product