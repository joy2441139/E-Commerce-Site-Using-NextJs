import initDB from "../../helpers/initDB";
import User from '../../models/User'
import bycrypt from 'bcryptjs'
import Cart from '../../models/Cart'
initDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {

            return res.status(422).json({ error: "please fillup all the fields" })
        }
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(422).json({ error: "This Email already exists" })
        }
        const hashedPassword = await bycrypt.hash(password, 12)
        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        }).save()
        await new Cart({ user: newUser._id }).save()
        res.status(201).json({ message: "Registration Succesful" })
    } catch (error) {
        console.log(error);
    }
}