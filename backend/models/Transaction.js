import mongoose from "mongoose";
const TransactionSchema = 
    new mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        amount: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            enum: ["deposit", "withdraw", "transfer","loan"],
            required: true,
        },
        status: {
            type: String,
            enum: ["success", "failed","pending"],
            default: "success",
        },
    },
    { timestamps: true })

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;