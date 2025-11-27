# EmailJS Setup Guide for FitFinder Pro

This guide will walk you through setting up EmailJS to send size recommendation emails to your users.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (e.g., Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider:
   - **For Gmail**: You'll need to enable 2-factor authentication and create an App Password
   - **For Outlook**: Use your regular login credentials
5. Save and note your **Service ID** (e.g., `service_xyz789`)

## Step 3: Create an Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set the **Subject**: `Your FitFinder Pro Size Recommendations - {{user_name}}`
4. Use this HTML template for the **Content**:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #f9fafb; }
    .measurements { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
    .table th { background: #6366f1; color: white; padding: 12px; text-align: left; }
    .table td { padding: 10px; border: 1px solid #ddd; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>👗 FitFinder Pro</h1>
    <p>Your Personalized Size Recommendations</p>
  </div>
  
  <div class="content">
    <h2>Hello {{user_name}}!</h2>
    <p>Thank you for using FitFinder Pro. Here are your personalized size recommendations based on your measurements.</p>
    
    <div class="measurements">
      <h3>📏 Your Measurements</h3>
      <ul>
        <li><strong>Bust:</strong> {{bust}} cm</li>
        <li><strong>Waist:</strong> {{waist}} cm</li>
        <li><strong>Hips:</strong> {{hips}} cm</li>
        <li><strong>Body Type:</strong> {{body_type}}</li>
      </ul>
    </div>
    
    <h3>🛍️ Size Recommendations ({{total_brands}} Brands)</h3>
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
        {{{recommendations_table}}}
      </tbody>
    </table>
    
    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <strong>💡 Shopping Tip:</strong> We recommend trying both your main size and alternative size when available for the best fit.
    </div>
  </div>
  
  <div class="footer">
    <p>Thank you for using FitFinder Pro!</p>
    <p>Visit us at <a href="http://localhost:8080">FitFinder Pro</a></p>
    <p style="font-size: 12px; color: #9ca3af;">This email was sent automatically. Please do not reply.</p>
  </div>
</body>
</html>
```

5. Make sure template variables match: `{{to_email}}`, `{{user_name}}`, `{{bust}}`, `{{waist}}`, `{{hips}}`, `{{body_type}}`, `{{recommendations_table}}`, `{{total_brands}}`
6. Save and note your **Template ID** (e.g., `template_abc123`)

## Step 4: Get Your Public Key

1. Go to "Account" → "General" in the EmailJS dashboard
2. Find your **Public Key** (e.g., `user_DEFghiJKLmno`)
3. Copy this key

## Step 5: Install EmailJS Package

Run this command in your frontend directory:

```bash
npm install @emailjs/browser
```

## Step 6: Update Configuration

1. Open `frontend/.env` file
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xyz789
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_EMAILJS_PUBLIC_KEY=user_DEFghiJKLmno
```

3. Open `frontend/src/services/emailService.ts`
4. Update the configuration (if not using .env):

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xyz789',      // Your actual service ID
  TEMPLATE_ID: 'template_abc123',    // Your actual template ID
  PUBLIC_KEY: 'user_DEFghiJKLmno',   // Your actual public key
};
```

## Step 7: Test Your Setup

1. Start your development server: `npm run dev`
2. Log in and take measurements
3. Click "Email Results" on the results page
4. Check your email inbox (and spam folder)

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**
   - Double-check your Public Key
   - Make sure you've called `emailjs.init()` with your public key

2. **404 Not Found Error**
   - Verify Service ID and Template ID are correct
   - Make sure the service is active in EmailJS dashboard

3. **Invalid Template Error**
   - Check that all template variables match ({{to_email}}, {{user_name}}, etc.)
   - Verify triple braces {{{ }}} are used for HTML content (recommendations_table)

4. **Emails Not Received**
   - Check spam/junk folder
   - Verify email service is properly configured in EmailJS
   - Test with the test email feature in EmailJS dashboard

5. **CORS Errors**
   - EmailJS works client-side, no CORS issues should occur
   - Make sure you're using the browser SDK, not Node.js SDK

## Free Tier Limits

EmailJS free tier includes:
- **200 emails per month**
- 2 email services
- 10 email templates
- Basic support

Perfect for small to medium-sized websites!

## Security Notes

- EmailJS public keys are **safe to expose** in frontend code
- They're designed to be public and have built-in rate limiting
- No sensitive API keys are exposed to the client

## Template Variables Reference

Your email template uses these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `to_email` | Recipient email address | user@example.com |
| `user_name` | User's name (or "Valued Customer") | John Doe |
| `bust` | Bust measurement in cm | 90 |
| `waist` | Waist measurement in cm | 70 |
| `hips` | Hips measurement in cm | 95 |
| `body_type` | User's body type | Hourglass |
| `recommendations_table` | HTML table with all recommendations | (HTML) |
| `total_brands` | Number of brand recommendations | 6 |

## Support & Documentation

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/
- Support: https://www.emailjs.com/support/

## Production Deployment

When deploying to production:
1. Update the website URL in the email template footer
2. Consider upgrading EmailJS plan if you expect >200 emails/month
3. Test the email service in production environment
4. Set up email tracking/analytics if needed

---

**Need Help?** Contact EmailJS support or check their comprehensive documentation.
