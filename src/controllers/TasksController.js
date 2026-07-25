import Task from '../models/TasksModel.js';

export default class TasksController {
    static async getTasks(req, res) {
        try {
            const tasks = await Task.find({ userId: req.userId });

            res.status(200).json({ tasks });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };

    static async createTask(req, res) {
        try {
            const newTask = {
                ...req.body,
                userId: req.userId
            };
            const task = await Task.create(newTask);
            
            res.status(201).json({ task });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };

    static async updateTask(req, res) {
        try {
            const id = req.params.id;
            const { userId, ...updatedData } = req.body;
            const updatedTask = await Task.findOneAndUpdate(
                { _id: id, userId: req.userId }, 
                { $set: updatedData },
                { new: true, runValidators: true }
            );

            if (!updatedTask) return res.status(404).json({ message: "Task not found or unauthorized" });
            
            res.status(200).json({ updatedTask });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };

    static async deleteTask(req, res) {
        try {
            const id = req.params.id;
            const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId });

            if (!deletedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

            res.status(200).json({ deletedTask });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        };
    };
}