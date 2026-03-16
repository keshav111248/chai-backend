import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { DB_NAME } from "../constants.js";

dotenv.config({
    path: '../../.env'
});

const seedData = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB for seeding.");

        // Clear existing data
        console.log("Clearing existing data...");
        await User.deleteMany({});
        await Video.deleteMany({});

        // Create demo users
        console.log("Creating demo users...");
        const users = await User.insertMany([
            {
                username: "johndoe",
                email: "john@example.com",
                fullName: "John Doe",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                password: "password123",
            },
            {
                username: "janedoe",
                email: "jane@example.com",
                fullName: "Jane Doe",
                avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                password: "password123",
            }
        ]);

        console.log(`${users.length} users created.`);

        // Create demo videos
        console.log("Creating demo videos...");
        const videos = await Video.insertMany([
            {
                videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                thumbnail: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
                title: "Big Buck Bunny",
                description: "The first Blender Open Movie from 2008.",
                duration: 596,
                owner: users[0]._id,
            },
            {
                videoFile: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                thumbnail: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg",
                title: "Elephants Dream",
                description: "The first open movie Project Orange.",
                duration: 653,
                owner: users[1]._id,
            }
        ]);

        console.log(`${videos.length} videos created.`);
        console.log("Seeding completed successfully!");

    } catch (error) {
        console.error("Error during seeding:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

seedData();
