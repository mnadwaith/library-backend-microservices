import axios from 'axios'

export async function tokenVerification(req, res, next) {
    try {
        let token = await axios.get('https://library-auth-microservices.onrender.com/auth/authenticate', { headers: { Authorization: req.headers.Authorization || req.headers.authorization } })
        req.user = token.data
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(403).json({ message: 'No Authorization' })
    }
}