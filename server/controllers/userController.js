import { Webhook } from "svix";
import userModel from '../models/userModel.js';

// API Controller Function to manage Clerk Users in Database
const clerkWebhooks = async (req, res) => {
    try {
        // Log headers for debugging
        console.log("Headers:", req.headers);
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook signature
        const payload = JSON.stringify(req.body); // Ensure you pass the correct body
        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        // Log incoming data
        const { data, type } = req.body;
        console.log("Received Webhook Data:", data);
        console.log("Webhook Type:", type);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };
                
                // Log userData before saving
                console.log("User Data to be created:", userData);

                await userModel.create(userData);
                res.json({ success: true, message: "User created successfully" });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };

                // Log userData before updating
                console.log("User Data to be updated:", userData);

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({ success: true, message: "User updated successfully" });
                break;
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({ success: true, message: "User deleted successfully" });
                break;
            }
            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
                break;
        }

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { clerkWebhooks };
