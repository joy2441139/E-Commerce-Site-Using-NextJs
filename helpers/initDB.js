import mongoose from "mongoose"

function initDB() {

    if (mongoose.connections[0].readyState) {
        console.log("already connected");
        return
    }

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
    mongoose.connection.on('connected', () => {
        console.log("connected to mongoDB");
    })
    mongoose.connection.on('error', (err) => {
        console.log("connection error", err);
    })
}

export default initDB