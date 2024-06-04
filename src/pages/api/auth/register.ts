import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type Data = {
  message?: string;
  user?: object;
  token?: string;
};

connectDB();

const registerHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email, username, password, arbitrumWallet } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = new User({
        email,
        username,
        password: hashedPassword,
        arbitrumWallet,
      });

      await user.save();

      // Create and sign a JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      res.status(201).json({
        message: 'User created successfully',
        user,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default registerHandler;
