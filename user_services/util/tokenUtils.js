import jwt from 'jsonwebtoken'

function generateToken(payload, expiresIn = '9h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.error('Token verification failed:', error.message);
        throw new Error('Invalid Token')
    }
}

export { generateToken, verifyToken }