const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User").default || require("./src/models/User");
const connectDB = require("./src/config/db").default || require("./src/config/db");

dotenv.config();

const fixAdmin = async () => {
  await connectDB();
  
  const email = "admin@knizeshop.com"; 
  const password = "admin1234";
  
  const user = await User.findOne({ email });
  
  if (user) {
    user.role = "admin";
    user.password = password; 
    await user.save();
    console.log(`✅ User ${email} has been updated to ADMIN with new password.`);
  } else {
    await User.create({
      username: "SuperAdmin",
      email: email,
      password: password,
      role: "admin"
    });
    console.log(`✅ Admin ${email} has been CREATED with password: ${password}`);
  }
  
  process.exit();
};

fixAdmin().catch(err => {
  console.error("❌ Fix Error:", err);
  process.exit(1);
});
