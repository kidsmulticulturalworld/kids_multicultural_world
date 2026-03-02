import emailjs from 'emailjs-com';

const sendFallbackEmail = async (data, errorDetails) => {
  const adminEmail = 'kidsmulticulturalworldkmw@gmail.com';
  const errorMessage = `
VOTE RECEIPT EMAIL FAILED - FALLBACK NOTIFICATION

Original email template failed. Details below:

Order ID: ${data.order_id || 'N/A'}
Customer Name: ${data.name || 'N/A'}
Customer Email: ${data.email || 'N/A'}
Candidate: ${data.candidate || 'N/A'}
Price: $${data.price || 'N/A'}
Date Created: ${data.date_created || 'N/A'}
Receipt Link: https://www.kidsmulticulturalworld.org/get-recept/${data.order_id || 'N/A'}

Error Details: ${errorDetails || 'Unknown error'}

Full Data: ${JSON.stringify(data, null, 2)}
  `.trim();

  // Try multiple fallback strategies
  const fallbackStrategies = [
    // Strategy 1: Try same template with minimal required fields
    async () => {
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE4,
        {
          to_email: adminEmail,
          subject: 'Vote Receipt - Fallback',
          name: data.name || 'Customer',
          candidate: data.candidate || 'N/A',
          price: data.price || '0',
          email: data.email || 'N/A',
          order_id: data.order_id || 'N/A',
          link: `https://www.kidsmulticulturalworld.org/get-recept/${data.order_id || 'N/A'}`,
        },
        process.env.REACT_APP_SECRETE
      );
    },
    // Strategy 2: Try template 3 with message field
    async () => {
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE3,
        {
          to_email: adminEmail,
          subject: 'Vote Receipt Failed',
          first_name: data.name ? data.name.split(' ')[0] : 'Customer',
          last_name: data.name ? data.name.split(' ').slice(1).join(' ') : 'N/A',
          email: data.email || adminEmail,
          phone: 'N/A',
          gender: 'N/A',
          parent_name: errorMessage,
        },
        process.env.REACT_APP_SECRETE
      );
    },
  ];

  // Try each strategy until one succeeds
  for (let i = 0; i < fallbackStrategies.length; i++) {
    try {
      await fallbackStrategies[i]();
      console.log(`Fallback email strategy ${i + 1} sent successfully`);
      return;
    } catch (strategyError) {
      console.error(`Fallback strategy ${i + 1} failed:`, strategyError);
      if (i === fallbackStrategies.length - 1) {
        console.error('All fallback email strategies failed. Error details:', errorMessage);
      }
    }
  }
};

const EmailForm = (data) => {
  // Add date and time and order_id and link to view mail
  const sendEmail = async () => {
    try {
      const templateParams = {
        to_email: 'kidsmulticulturalworldkmw@gmail.com',
        subject: 'Vote Receipt',
        name: data.name,
        candidate: data.candidate,
        price: data.price,
        email: data.email,
        order_id: data.order_id,
        // date_created:data.date_created,
        image_base64: data.signature,
        link: `https://www.kidsmulticulturalworld.org/get-recept/${data.order_id}`,
      };

      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE4,
        templateParams,
        process.env.REACT_APP_SECRETE
      );
      console.log('Vote receipt email sent successfully');

    } catch (error) {
      console.error('Failed to send vote receipt email:', error);
      // Trigger fallback email with error details
      await sendFallbackEmail(data, error.message || JSON.stringify(error));
    }
  };
  sendEmail();
};

export default EmailForm;
