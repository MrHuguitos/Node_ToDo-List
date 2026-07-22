import User from "../models/UsersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };
}