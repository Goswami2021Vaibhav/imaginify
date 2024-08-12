
import mongoose, { Mongoose } from "mongoose"
const MONGODB_URL = process.env.MONGODB_URL
interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Storing cached connection objce 
let cached: MongooseConnection = (global as any).mongoose

// Initiate cached object if not exist 
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    // Return database connection if exists in cached object. 
    if (cached.conn) return cached.conn
    if (!MONGODB_URL) throw new Error('Missing mongodb url')

    // Storing the connection promise from mongoose.connect 
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false })

    // Store the active connection in cached.conn once the promise resolves
    cached.conn = await cached.promise;

    // Finnaly return active connection 
    return cached.conn
}



