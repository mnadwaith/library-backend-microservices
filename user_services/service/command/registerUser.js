import bcrypt from 'bcryptjs'
import { postData } from './addUser.js'

export async function registerUser(res, data) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        await postData([{ name: data.name, email: data.email, password: hashedPassword, role: data.role }])
        return res.status(201).json({ message: 'User registered successfully', userId: data.email })
    } catch (error) {
        if (error.name == 'ValidationError') {
            return res.status(422).json({ message: 'Invalid Role' })
        }
        console.log('Error' + error)
        return res.status(409).json({ message: 'User Exists', userId: data.email })
    }
}

