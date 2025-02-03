import { registerUser } from "../service/command/registerUser.js";
import { userLogin } from "../service/command/userLogin.js"
import { tokenVerification } from "../service/query/authentication.js";
import { getData } from "../service/query/getUsers.js";
import { editData } from '../service/command/edituser.js'
// Login
async function login(req, res) {
    let data = req.body

    await userLogin(res, data)
}

// Register new user
async function register(req, res) {
    let data = req.body
    await registerUser(res, data);
}

// Authenticate the user
async function authenticate(req, res) {
    await tokenVerification(req, res)
}

async function showUsers(req, res) {
    try {
        const data = await getData()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

async function editUsers(req, res) {
    try {
        const filter = req.params.id
        const data = req.body
        const output = await editData(filter, data)
        res.status(200).json(output)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export { login, register, authenticate, showUsers, editUsers }