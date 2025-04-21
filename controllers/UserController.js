import User from '../models/UserModel.js';
import Report from '../models/ReportModel.js';

export const registerUser = async (req, res) => {
    try {
      const { email, username, password } = req.body;

      console.log('Received:', { email, username, password });
  
      const existingemail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
      if (existingUsername || existingemail) {
        return res.status(400).json({ message: 'User already exists' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' });
      }
      const newUser = new User({ email, username, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
      maxAge: 3600000, 
    });

    return res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  return res.status(200).json({ message: 'Logged out successfully' });
};