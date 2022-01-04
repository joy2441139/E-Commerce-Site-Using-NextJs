import initDB from "../../helpers/initDB"
import Product from "../../models/Product"

initDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getAllProducts(req, res)
            break;
        case "POST":
            await saveProduct(req, res)
            break;


    }

}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }

}

const saveProduct = async (req, res) => {
    const { code, name, price, imgURL } = req.body
    try {
        if (!code || !name || !price || !imgURL) {
            return res.status(422).json({ error: "Please add all the fields" })
        }
        const product = await new Product({
            code: code,
            name: name,
            price: price,
            imgURL: imgURL
        }).save()
        res.status(201).json(product)

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
        console.log(error);

    }

}

