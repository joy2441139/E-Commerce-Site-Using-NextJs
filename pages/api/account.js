import Cart from "../../models/Cart"
import initDB from "../../helpers/initDB"

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }

}

const deleteProduct = async (req, res) => {
    const cid = []
    const cart = Cart.findOne()
    Cart.findOneAndReplace(cart.products, cid, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        res.status(200).json({})
    });
}
