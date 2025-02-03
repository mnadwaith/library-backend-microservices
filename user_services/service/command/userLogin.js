import userModel from "../../model/user.js"
import { generateToken } from "../../util/tokenUtils.js"
import bcrypt from 'bcryptjs'

export async function userLogin(res, data) {
    try {
        const user = await userModel.findOne({ email: data.email })
        if (!user) {
            return res.status(404).json({ message: "User Does Not Exist" })
        }
        const isMatch = await bcrypt.compare(data.password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = generateToken({
            email: user.email,
            role: user.role
        })

        return res.status(200).json({ token: token })
    } catch (error) {
        console.log('Error' + error.message)
    }
}