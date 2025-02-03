import { verifyToken } from '../../util/tokenUtils.js'

// Authenticate the token from the authorization header
export const tokenVerification = (req, res) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(400).json({ message: 'Token not provided' })
        }
        try {
            return res.status(200).json(verifyToken(token))
        } catch (err) {
            return res.status(401).json({ message: 'Token Invalid' })
        }
    } else {
        return res.status(403).json({ message: 'No Authorization' })
    }
}
