import { User } from '@/models/user.model.js';
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/utils/auth.utils.js';
import { AuthTokens, User as UserType } from '@/types/auth.types.js';

export class AuthService {
  async register(email: string, password: string): Promise<{ user: UserType; tokens: AuthTokens }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in MongoDB
    const newUser = new User({
      email,
      password_hash: hashedPassword,
    });

    await newUser.save();

    // Generate tokens
    const tokens = this.generateTokens(newUser._id.toString(), newUser.email);

    return {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        created_at: newUser.created_at.toISOString(),
      },
      tokens,
    };
  }

  async login(email: string, password: string): Promise<{ user: UserType; tokens: AuthTokens }> {
    // Get user from database
    const userData = await User.findOne({ email });

    if (!userData) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await comparePassword(password, userData.password_hash);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = this.generateTokens(userData._id.toString(), userData.email);

    return {
      user: {
        id: userData._id.toString(),
        email: userData.email,
        created_at: userData.created_at.toISOString(),
      },
      tokens,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = verifyRefreshToken(refreshToken);

      // Verify user still exists
      const userData = await User.findById(payload.userId);

      if (!userData) {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      return this.generateTokens(userData._id.toString(), userData.email);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async getUserById(userId: string): Promise<UserType> {
    const userData = await User.findById(userId);

    if (!userData) {
      throw new Error('User not found');
    }

    return {
      id: userData._id.toString(),
      email: userData.email,
      created_at: userData.created_at.toISOString(),
    };
  }

  private generateTokens(userId: string, email: string): AuthTokens {
    const accessToken = generateAccessToken({ userId, email });
    const refreshToken = generateRefreshToken({ userId, tokenVersion: 1 });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }
}
