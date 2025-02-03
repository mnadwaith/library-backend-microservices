// Verification of the role of the api and the token permision
export const roleVerification = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) { //if the token does not have proper permission return error
            return res.status(403).json({ message: 'Insufficient permissions' })
        }
        next()
    }
}
