const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Define User schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: String,
  dob: String,
  uniqueIdentification: String,
  password: { type: String, required: true },
  transactionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }]
});
const User = mongoose.model("User", userSchema);

// Define Seller schema and model
const sellerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  acres: { type: Number, required: true },
  registrationNumber: String,
  landPrice: Number,
  locality: { type: String, required: true },
  surveyNumber: String,
  landStatus: String,
  imageUpload: String,
  transactionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Seller = mongoose.model("Seller", sellerSchema);

// Define FinalSeller schema and model
const finalSellerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  acres: { type: Number, required: true },
  registrationNumber: String,
  landPrice: Number,
  locality: { type: String, required: true },
  surveyNumber: String,
  landStatus: String,
  imageUpload: String,
  transactionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const FinalSeller = mongoose.model("FinalSeller", finalSellerSchema);

// Define Surveyor schema and model
const surveyorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Surveyor = mongoose.model('Surveyor', surveyorSchema);

// Correct schema definition for NonGovtLand (FinalSeller)
const nonGovtLandSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  acres: { type: Number, required: true },
  registrationNumber: String,
  landPrice: Number,
  locality: { type: String, required: true },
  surveyNumber: String,
  landStatus: String,
  imageUpload: String,
  transactionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'finalsellers' });

const NonGovtLand = mongoose.model('NonGovtLand', nonGovtLandSchema);

// Route to handle user registration
app.post("/api/register", async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    gender,
    dob,
    uniqueIdentification,
    password,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      gender,
      dob,
      uniqueIdentification,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Respond with success message and user ID
    res.status(201).json({
      message: "User registered successfully",
      userId: savedUser._id, // Send the user ID in the response
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to handle user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Login failed. Please try again.", error: error.message });
  }
});
// Route to handle surveyor signup
app.post("/api/surveyor/signup", async (req, res) => {
  const {
    email,
    password,
    securityKey
  } = req.body;

  try {
    // Check if surveyor already exists
    const existingSurveyor = await Surveyor.findOne({ email });
    if (existingSurveyor) {
      return res.status(400).json({ message: "Surveyor already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new surveyor
    const newSurveyor = new Surveyor({
      email,
      password: hashedPassword,
    });

    // Save surveyor to the database
    await newSurveyor.save();

    res.status(201).json({ message: "Surveyor registered successfully" });
  } catch (error) {
    console.error("Error registering Surveyor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to handle surveyor login
app.post("/api/surveyor/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find surveyor by email
    const surveyor = await Surveyor.findOne({ email });
    if (!surveyor) {
      console.error("Surveyor not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password using bcrypt compare
    const isMatch = await bcrypt.compare(password, surveyor.password);
    if (!isMatch) {
      console.error("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT or perform other actions upon successful login
    const token = jwt.sign({ id: surveyor._id }, "your_jwt_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in surveyor:", error);
    res.status(500).json({ message: "Login failed. Please try again.", error: error.message });
  }
});

// Route to handle form submission for seller details
app.post("/api/sellerDetails", upload.single("imageUpload"), async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    // Generate new transaction ID
    const transactionId = `TRANS-${Math.random().toString(36).substr(2, 9)}`;

    // Create new Seller instance
    const newSellerDetails = new Seller({
      ownerName: req.body.ownerName,
      acres: req.body.acres,
      registrationNumber: req.body.registrationNumber,
      landPrice: req.body.landPrice,
      locality: req.body.locality,
      surveyNumber: req.body.surveyNumber,
      landStatus: req.body.landStatus,
      imageUpload: req.file.path,
      userId: req.body.userId // Assuming userId is sent in request body
    });

    // Save seller details
    await newSellerDetails.save();

    // Update User with transaction ID
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId, // Assuming userId is sent in request body
      { $push: { transactionIds: newSellerDetails._id } }, // Add the new Seller _id to the user's transactionIds array
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    res.status(201).json({ message: "Seller details submitted successfully", transactionId });
  } catch (error) {
    console.error("Error saving seller details:", error);
    res.status(500).json({ message: "Failed to save seller details" });
  }
});

// Route to update seller details with transaction ID
app.post("/api/updateSellerTransactionId", async (req, res) => {
  try {
    const { sellerId, transactionId } = req.body;

    // Update Seller document with transaction ID
    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { transactionId: transactionId },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Update User's transactionIds array with the Seller's _id
    const user = await User.findOneAndUpdate(
      { _id: updatedSeller.userId },
      { $push: { transactionIds: updatedSeller._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated seller with transaction ID:", updatedSeller);

    res.status(200).json({ message: "Transaction ID updated successfully", seller: updatedSeller });
  } catch (error) {
    console.error("Error updating transaction ID:", error);
    res.status(500).json({ message: "Failed to update transaction ID" });
  }
});

// Route to fetch all seller details
app.get("/api/sellerDetails", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error retrieving seller details:", error);
    res.status(500).json({ error: "Error retrieving seller details" });
  }
});

// Route to fetch the latest seller details
app.get("/api/latestSellerDetails", async (req, res) => {
  try {
    const latestSeller = await Seller.findOne().sort({ _id: -1 }).exec();
    if (!latestSeller) {
      return res.status(404).json({ message: "Seller details not found" });
    }
    res.status(200).json(latestSeller);
  } catch (error) {
    console.error("Error fetching latest seller details:", error);
    res.status(500).json({ message: "Failed to fetch seller details" });
  }
});

// Route to approve a seller and move to finalsellers collection
app.post("/api/approveSeller", async (req, res) => {
  const { sellerId } = req.body;

  try {
    // Find seller by ID
    const seller = await Seller.findOne({ _id: sellerId });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Create a new FinalSeller instance
    const newFinalSeller = new FinalSeller({
      ownerName: seller.ownerName,
      acres: seller.acres,
      registrationNumber: seller.registrationNumber,
      landPrice: seller.landPrice,
      locality: seller.locality,
      surveyNumber: seller.surveyNumber,
      landStatus: seller.landStatus,
      imageUpload: seller.imageUpload,
      transactionId: seller.transactionId,
      userId: seller.userId
    });

    // Save final seller details
    await newFinalSeller.save();

    // Remove seller from Sellers collection
    await Seller.findOneAndDelete({ _id: sellerId });

    res.status(201).json({ message: "Seller approved and moved to final sellers", finalSeller: newFinalSeller });
  } catch (error) {
    console.error("Error approving seller:", error);
    res.status(500).json({ message: "Failed to approve seller" });
  }
});

app.post("/api/disapproveSeller", async (req, res) => {
  const { sellerId } = req.body;

  try {
    console.log(`Received request to disapprove seller with ID: ${sellerId}`);

    // Ensure sellerId is a valid ObjectId
    if (!ObjectId.isValid(sellerId)) {
      console.log(`Invalid ObjectId format: ${sellerId}`);
      return res.status(400).json({ message: "Invalid seller ID format" });
    }

    const objectId = new ObjectId(sellerId);
    const deletedSeller = await Seller.findByIdAndDelete(objectId);

    console.log(`Deletion attempt result: ${deletedSeller}`);

    if (!deletedSeller) {
      console.log(`Seller with ID: ${sellerId} not found for deletion`);
      return res.status(404).json({ message: "Seller not found for deletion" });
    }

    res.status(200).json({ message: "Seller disapproved and removed successfully" });
  } catch (error) {
    console.error("Error disapproving seller:", error);
    res.status(500).json({ message: "Failed to disapprove seller", error: error.message });
  }
});

// Route to retrieve non-government land details (finalsellers)
app.get("/api/nongovtlands", async (req, res) => {
  try {
    console.log("Fetching non-government land details..."); // Add logging

    const nonGovtLands = await NonGovtLand.find(); // Ensure it uses the correct model

    console.log("Non-government land details fetched successfully:", nonGovtLands); // Log fetched data

    res.status(200).json(nonGovtLands);
  } catch (error) {
    console.error("Error retrieving non-government land details:", error);

    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.get('/api/conversion-rate/:from/:to', (req, res) => {
  const { from, to } = req.params;
  try {
    // For simplicity, using a fixed rate. In a real app, you'd fetch this from an actual API
    const conversionRate = 0.000002; // 1 INR = 0.000002 ETH (example rate)
    console.log(`Conversion rate from ${from} to ${to}: ${conversionRate}`);
    res.json({ rate: conversionRate });
  } catch (error) {
    console.error('Error in conversion rate API:', error);
    res.status(500).json({ error: 'Failed to get conversion rate' });
  }
});

// Route to get user data by ID
app.get('/api/userById/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    if (user) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        uniqueIdentification: user.uniqueIdentification,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
