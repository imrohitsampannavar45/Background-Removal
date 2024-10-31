import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    clerkId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    photo: { 
        type: String, 
        required: true 
    },
    firstName: { 
        type: String 
    },
    lastName: { 
        type: String 
    },
    creditBalance: { 
        type: Number, 
        default: 5 
    }
}, { timestamps: true }); // Timestamps to track creation and modification times

// Check if the user model already exists to avoid recompilation errors in development
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
