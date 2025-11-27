import { Response, NextFunction } from 'express';
import { EmailService } from '@/services/email.service.js';
import { AuthRequest } from '@/types/express.types.js';
import { z } from 'zod';

const emailService = new EmailService();

const sendEmailSchema = z.object({
  measurements: z.object({
    bust: z.number().positive(),
    waist: z.number().positive(),
    hips: z.number().positive(),
    bodyType: z.string(),
  }),
  recommendations: z.array(
    z.object({
      brandName: z.string(),
      size: z.string(),
      alternative: z.string().optional(),
      confidence: z.number().min(0).max(100),
      category: z.string(),
      priceRange: z
        .object({
          min: z.number(),
          max: z.number(),
          currency: z.string(),
        })
        .optional(),
    })
  ),
  email: z.string().email().optional(),
});

export const sendResultsEmail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { measurements, recommendations, email: customEmail } = sendEmailSchema.parse(req.body);

    // Use custom email if provided, otherwise use user's registered email
    const recipientEmail = customEmail || req.user.email;
    const userName = recipientEmail.split('@')[0] || 'Valued Customer';

    // Send email
    await emailService.sendSizeRecommendations(
      recipientEmail,
      userName,
      measurements,
      recommendations
    );

    res.status(200).json({
      message: 'Results sent successfully',
      email: recipientEmail,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request data', details: error.errors });
      return;
    }
    next(error);
  }
};
