import User from '../models/UserModel.js';
import Report from '../models/ReportModel.js';

export const registerUser = async (req, res) => {
    try {
      const { email, username, password } = req.body;

      console.log('Received:', { email, username, password }); // Debug
  
      const existingemail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
      if (existingUsername || existingemail) {
        return res.status(400).json({ message: 'User already exists' });
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
      const { email, username, password } = req.body;
  
      const userEmail = await User.findOne({ email });
      const userUsername = await User.findOne({ username });
      if (!userEmail && !userUsername) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }//da controllare
      const token = user.generateAuthToken();
      return res.status(200).json({ token, user });
    }
    catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
};

