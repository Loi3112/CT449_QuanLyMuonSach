const jwt = require('jsonwebtoken')

const generateAccessToken = (account) => jwt.sign(
    {
        id: account._id,
        admin: account.admin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
)

const generateRefreshToken = (account) => jwt.sign(
    {
        id: account.id,
        admin: account.admin,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '365d' }
)

module.exports = {
    generateAccessToken,
    generateRefreshToken
}