import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

interface EmailData {
  to_email: string;
  user_name: string;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
    bodyType: string;
  };
  recommendations: Array<{
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
  }>;
}

export const sendSizeRecommendations = async (data: EmailData): Promise<void> => {
  try {
    // Format recommendations as simple text
    const recommendationsText = data.recommendations
      .map(
        (rec) => `${rec.brandName} (${rec.category}): Size ${rec.size}${rec.alternative ? ` or ${rec.alternative}` : ''}`
      )
      .join('\n');

    // Prepare email template parameters with simple structure
    const templateParams = {
      to_name: data.user_name || 'Valued Customer',
      to_email: data.to_email,
      message: `Your Body Measurements:
Bust: ${data.measurements.bust} cm
Waist: ${data.measurements.waist} cm
Hips: ${data.measurements.hips} cm
Body Type: ${data.measurements.bodyType.replace('_', ' ')}

Your Recommended Sizes:
${recommendationsText}

Thank you for using FitFinder Pro!`,
    };

    console.log('Sending email with params:', templateParams);
    console.log('Using service:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('Using template:', EMAILJS_CONFIG.TEMPLATE_ID);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('EmailJS Response:', response);

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to send email. Please try again.'
    );
  }
};

// Test email service configuration
export const testEmailService = async (testEmail: string): Promise<boolean> => {
  try {
    const testData: EmailData = {
      to_email: testEmail,
      user_name: 'Test User',
      measurements: {
        bust: 90,
        waist: 70,
        hips: 95,
        bodyType: 'hourglass',
      },
      recommendations: [
        {
          brandName: 'Test Brand',
          size: 'M',
          alternative: 'L',
          confidence: 95,
          category: 'Casual Wear',
          priceRange: {
            min: 5000,
            max: 15000,
            currency: 'LKR',
          },
        },
      ],
    };

    await sendSizeRecommendations(testData);
    return true;
  } catch (error) {
    console.error('Email service test failed:', error);
    return false;
  }
};
