import jwt from "jsonwebtoken";

export default class AuthMiddleware {
    static async authMiddleware(req, res, next) {
        try {
            const token = req.cookies.token;

            if (!token) return res.status(401).json({ message: "Unauthorized" });

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decodedToken.id;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Unauthorized" });
        };
    };
}