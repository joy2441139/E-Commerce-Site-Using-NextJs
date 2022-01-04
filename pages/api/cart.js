import jwt from "jsonwebtoken"
import Cart from "../../models/Cart"
import initDB from "../../helpers/initDB";
initDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUserCart(req, res)
            break;
        case "PUT":
            await addProduct(req, res)
            break;
        case "DELETE":
            await deleteCart(req, res)
            break;
    }
}



const fetchUserCart = async (req, res) => {

    const { authorization } = req.headers;

    if (!authorization) {

        return res.status(401).json({ error: "must login first" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.SECRET)
        const cart = await Cart.findOne({ userId })
            .populate("products.product")
        res.status(200).json(cart.products)

    } catch (error) {
        return res.status(401).json({ error: "must login first" })
    }

}

const addProduct = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {

        return res.status(401).json({ error: "must login first" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.SECRET)
        const { quantity, productId } = req.body
        const cart = await Cart.findOne({ userId })
        const pExists = cart.products.some(pdoc => productId === pdoc.product.toString())
        if (pExists) {
            await Cart.findOneAndUpdate(
                { _id: cart._id, "products.product": productId },
                { $inc: { "products.$.quantity": quantity } },

            )

        }
        else {
            const newProduct = { quantity, product: productId }
            await Cart.findOneAndUpdate(
                { _id: cart._id },
                { $push: { products: newProduct } }
            )
        }
        res.status(200).json({ message: "product added to cart" })

    } catch (error) {
        return res.status(401).json({ error: "must login first" })
    }
}

const deleteCart = async (req, res) => {
    const cid = []
    const cart = Cart.findOne()
    Cart.findOneAndReplace(cart.products, cid, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        res.status(200).json({})
    });
}