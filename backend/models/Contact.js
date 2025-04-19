import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        
        email: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
