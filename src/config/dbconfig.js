import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: 'To-Do_List' });
        console.log("MongoDB conectado com sucesso");
    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error);
        process.exit(1);
    };
};

export default connectDB;