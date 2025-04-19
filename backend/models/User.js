import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 
// Define User Schema 
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    accountId: { type: String },
    profilePhoto: { type: String },
  },
  { timestamps: true }
); 
 
// Password Hashing Before Saving 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.profilePhoto) {
    const [firstName, lastName] = this.name.split(" ");
    this.profilePhoto = `https://api.dicebear.com/9.x/initials/svg?seed=${
      firstName || "User"
    }+${lastName || ""}`;
  }
  next();
});

// Compare Password Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create User Model
const User = mongoose.model("User", userSchema);

export default User;
