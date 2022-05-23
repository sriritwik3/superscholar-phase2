import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_KEY;

export const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    //const token = req.header('Access-Tokem');
    console.log(req.header('Access-Token'));
    let token = req.headers.authorization;
    if (!token) {
        return next();
    }
    // console.log(token.slice(7));
    try {
        if (token.startsWith("Bearer ")) token = token.slice(7);
        else { return next(); }
        const temp = jwt
            .verify(token, 'Pretending to be a secert! Buahh!', {
                ignoreExpiration: true,
            });
        req.username = temp.username;
    } catch (err) {
        console.log(err);
        return next();
    }
    next();
}

export const isAuthenticated = (req, res, next) => {
    if (req.username) {
        return next();
    }
    res.status(401).json({ err: "User not authenticated" });
}