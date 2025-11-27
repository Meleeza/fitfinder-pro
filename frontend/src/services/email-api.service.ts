const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

interface SendEmailRequest {
  measurements: Measurements;
  recommendations: Recommendation[];
  email?: string;
}

export const emailApi = {
  sendResultsEmail: async (data: SendEmailRequest, token: string) => {
    const response = await fetch(`${API_BASE_URL}/email/send-results`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to send email' }));
      throw new Error(error.error || 'Failed to send email');
    }

    return response.json();
  },
};
