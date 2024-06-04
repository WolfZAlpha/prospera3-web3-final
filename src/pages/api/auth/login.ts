import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

type Data = {
  message?: string;
  user?: object;
  token?: string;
};

connectDB();

const loginHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { emailOrUsername, password } = req.body;

    try {
      // Find the user by email or username
      const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create and sign a JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      // Set the JWT token in an HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600, // 1 hour
        path: '/',
        domain: 'localhost', // Make sure the domain is correct for your environment
        sameSite: 'lax',
      }));

      res.status(200).json({
        message: 'Logged in successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default loginHandler;
