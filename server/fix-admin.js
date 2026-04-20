const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Minimal User Model for the script
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Hash password manually before saving (if not using the model file)
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

dotenv.config();

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("📡 Connected to MongoDB...");

    const email = "admin@knizeshop.com"; 
    const password = "admin1234";
    
    let user = await User.findOne({ email });
    
    if (user) {
      user.role = "admin";
      user.password = password; 
      await user.save();
      console.log(`✅ User ${email} has been updated to ADMIN with password: ${password}`);
    } else {
      await User.create({
        username: "SuperAdmin",
        email: email,
        password: password,
        role: "admin"
      });
      console.log(`✅ Admin ${email} has been CREATED with password: ${password}`);
    }
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

fixAdmin();
