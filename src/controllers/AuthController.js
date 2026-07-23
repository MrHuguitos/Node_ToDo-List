import User from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export default class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            await newUser.save();

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select("+password");

            if (!user) return res.status(404).json({ message: "User not found" });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ token, name: user.name });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };

    static async googleLogin(req, res) {
        try {
            const { token } = req.body;
            
            if (!token) return res.status(400).json({ message: "Token is required" });

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const { email, name } = payload;

            let user = await User.findOne({ email });

            if (!user) {
                const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(randomPassword, 10);
                
                user = new User({
                    name,
                    email,
                    password: hashedPassword
                });
                await user.save();
            }

            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ token: jwtToken, name: user.name });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error during Google Login" });
        }
    };
}