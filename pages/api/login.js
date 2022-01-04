import initDB from "../../helpers/initDB";
import User from '../../models/User'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs/dist/bcrypt";
initDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {

            return res.status(422).json({ error: "please fillup all the fields" })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
                expiresIn: "7d"
            })
            const { name, role, email } = user
            res.status(201).json({ token, user: { name, role, email } })
        }
        else {
            return res.status(422).json({ error: "Email or Password didn't match" })
        }
    } catch (error) {
        console.log(error);
    }
}