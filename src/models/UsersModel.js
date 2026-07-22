import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true,
        minlength: 8,
        select: false
    }
}, { timestamps: true, collection: 'usuarios' });

export default mongoose.model('User', usersSchema);