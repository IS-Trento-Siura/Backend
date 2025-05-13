// import User from '../models/UserModel.js';
// import Report from '../models/ReportModel.js';
import Org from '../models/OrgModel.js';


export const register = async (req, res) => {
    try {
      const { email, username, password, phone, indirizzo } = req.body;
  
      console.log('Received:', { email, username, password, phone, indirizzo });
  
      const existingemail = await Org.findOne({ email });
      const existingUsername = await Org.findOne({ username });
      if (existingUsername || existingemail) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' });
      }
      const newOrg = new Org({ email, username, password, phone, indirizzo });
      await newOrg.save();
  
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const org = await Org.findOne({ email });
    if (!org) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await org.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = org.generateAuthToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
      maxAge: 3600000, 
    });

    return res.status(200).json({ message: 'Logged in successfully', org });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};