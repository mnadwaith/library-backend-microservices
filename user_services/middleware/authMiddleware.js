import axios from 'axios'

async function tokenVerification(req, res, next) {
    try {
        const token = await axios.get('http://localhost:3001/auth/authenticate', { headers: { Authorization: req.headers.Authorization || req.headers.authorization } })
        req.user = token.data
        next()
    } catch (error) {
        console.log(error.message)
        res.status(403).json({ message: "No Authorization" })
    }
}

export default tokenVerification