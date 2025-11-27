import { createEmailTransporter, emailConfig } from '@/config/email.js';

interface Recommendation {
  brandName: string;
  size: string;
  alternative?: string;
  confidence: number;
  category: string;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

interface Measurements {
  bust: number;
  waist: number;
  hips: number;
  bodyType: string;
}

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createEmailTransporter();
  }

  async sendSizeRecommendations(
    toEmail: string,
    userName: string,
    measurements: Measurements,
    recommendations: Recommendation[]
  ): Promise<void> {
    const recommendationsTable = recommendations
      .map(
        (rec) => `
        <tr>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${rec.brandName}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${rec.category}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #6366f1; font-size: 16px;">${rec.size}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${rec.alternative || '-'}</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${rec.confidence}%</td>
          <td style="padding: 12px; border: 1px solid #e5e7eb;">${
            rec.priceRange
              ? `${rec.priceRange.currency} ${rec.priceRange.min.toLocaleString()} - ${rec.priceRange.max.toLocaleString()}`
              : '-'
          }</td>
        </tr>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
          }
          .header {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: bold;
          }
          .content {
            padding: 30px;
          }
          .measurements {
            background: #f3f4f6;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .measurements h3 {
            margin: 0 0 15px 0;
            color: #1f2937;
          }
          .measurements ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .measurements li {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .measurements li:last-child {
            border-bottom: none;
          }
          .measurements strong {
            color: #6366f1;
            display: inline-block;
            width: 120px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .table th {
            background: #6366f1;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
          }
          .table td {
            padding: 12px;
            border: 1px solid #e5e7eb;
          }
          .tip-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 30px;
            background: #f9fafb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>👗 FitFinder Pro</h1>
            <p>Your Personalized Size Recommendations</p>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;">Hello ${userName}!</p>
            <p>Thank you for using FitFinder Pro. Here are your personalized size recommendations based on your measurements.</p>
            
            <div class="measurements">
              <h3>📏 Your Measurements</h3>
              <ul>
                <li><strong>Bust:</strong> ${measurements.bust} cm</li>
                <li><strong>Waist:</strong> ${measurements.waist} cm</li>
                <li><strong>Hips:</strong> ${measurements.hips} cm</li>
                <li><strong>Body Type:</strong> ${measurements.bodyType.replace('_', ' ')}</li>
              </ul>
            </div>
            
            <h3 style="color: #111827; margin: 30px 0 15px 0;">🛍️ Size Recommendations (${recommendations.length} Brands)</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Size</th>
                  <th>Alternative</th>
                  <th>Confidence</th>
                  <th>Price Range</th>
                </tr>
              </thead>
              <tbody>
                ${recommendationsTable}
              </tbody>
            </table>
            
            <div class="tip-box">
              <strong>💡 Shopping Tip:</strong> We recommend trying both your main size and alternative size when available for the best fit.
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for using <strong>FitFinder Pro</strong>!</p>
            <p style="font-size: 12px; color: #9ca3af; margin: 20px 0 0 0;">
              This email was sent automatically. Please do not reply.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.transporter.sendMail({
      from: `${emailConfig.from.name} <${emailConfig.from.address}>`,
      to: toEmail,
      subject: `Your FitFinder Pro Size Recommendations - ${userName}`,
      html,
    });
  }
}
