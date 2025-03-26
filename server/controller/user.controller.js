
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, password, age, gender, height, weight } = req.body;

    // Check if a user with the provided email already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document.
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      height,
      weight,
    });
    console.log(user);
    // Generate a JWT token with the user's ID as payload.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send a successful response with the token and full user data.
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email);
    if (!email || !password) {
      return res.status(402).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return success response with token and full user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
      },
    });
  } catch (error) {
    res.status(510).json({ message: error.message });
  }
};

// controllers/contactController.js
import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    // Configure Nodemailer transporter (using Gmail as an example)
    const transporter = nodemailer.createTransport({
      service: "gmail", // For Gmail SMTP
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASSWORD, // Your app password (not your actual Gmail password)
      },
    });

    // Define email options
    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender details (from contact form)
      to: process.env.EMAIL, // Email where you want to receive the messages
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ message: error.message });
  }
};
