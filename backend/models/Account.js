import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true }, // This field is required
    balance: { type: Number, default: 0 },
  }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
