import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected !! HOST: ${connection.connection.host}`)
  } catch (error) {
    console.error("MONGODB connection error:", error.message)
    process.exit(1)
  }
}

export default connectDB