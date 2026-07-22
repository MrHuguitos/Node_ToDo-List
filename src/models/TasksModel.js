import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 255 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending' 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true 
    }
}, { timestamps: true, collection: 'tarefas' });

export default mongoose.model('Task', tasksSchema);