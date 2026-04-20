import emailjs from 'emailjs-com';

/** CRA only inlines REACT_APP_* — set REACT_APP_FRONT_END_URL in .env for canonical receipt links. */
const PUBLIC_SITE_URL = (
  process.env.REACT_APP_FRONT_END_URL || 'https://kidsmulticulturalworld.org'
).replace(/\/$/, '');

/** EmailJS rejects oversized template params; signature PNGs as base64 are often 100KB+. */
const MAX_SIGNATURE_CHARS = 40000;

function signatureForTemplate(signature) {
  if (signature == null || signature === '') return '';
  const s = String(signature);
  if (s.length <= MAX_SIGNATURE_CHARS) return s;
  return '[Signature image omitted — view full receipt at the link below]';
}

function assertEmailJsEnv() {
  const { REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE4, REACT_APP_SECRETE } = process.env;
  if (!REACT_APP_SERVICE_ID || !REACT_APP_TEMPLATE4 || !REACT_APP_SECRETE) {
    console.error(
      'EmailJS: missing REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE4, or REACT_APP_SECRETE. ' +
        'Receipt emails require these at build time (Create React App).'
    );
    return false;
  }
  return true;
}

if (process.env.REACT_APP_SECRETE) {
  emailjs.init(process.env.REACT_APP_SECRETE);
}

function dataWithoutHugeSignature(data) {
  const copy = { ...data };
  if (copy.signature && String(copy.signature).length > 800) {
    copy.signature = '[omitted — large image]';
  }
  return copy;
}

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
Receipt Link: ${PUBLIC_SITE_URL}/get-recept/${data.order_id || 'N/A'}

Error Details: ${errorDetails || 'Unknown error'}

Full Data: ${JSON.stringify(dataWithoutHugeSignature(data), null, 2)}
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
          link: `${PUBLIC_SITE_URL}/get-recept/${data.order_id || 'N/A'}`,
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

async function sendVoteReceiptEmail(data) {
  if (!assertEmailJsEnv()) {
    return;
  }

  const fromId =
    data.id != null && data.order_id == null ? Number(data.id) + 1000 : undefined;
  const orderId =
    data.order_id != null ? data.order_id : Number.isFinite(fromId) ? fromId : undefined;
  if (orderId == null) {
    console.error('Vote receipt email: missing order_id / id', data);
    return;
  }
  const templateParams = {
    to_email: 'kidsmulticulturalworldkmw@gmail.com',
    subject: 'Vote Receipt',
    name: data.name,
    candidate: data.candidate,
    price: data.price,
    email: data.email,
    order_id: orderId,
    date_created: data.date_created,
    image_base64: signatureForTemplate(data.signature),
    link: `${PUBLIC_SITE_URL}/get-recept/${orderId}`,
  };

  try {
    await emailjs.send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE4,
      templateParams,
      process.env.REACT_APP_SECRETE
    );
    console.log('Vote receipt email sent successfully');
  } catch (error) {
    console.error('Failed to send vote receipt email:', error);
    await sendFallbackEmail(data, error.message || JSON.stringify(error));
  }
}

/** Fire-and-forget; always attach rejection handler so failures surface in the console. */
const EmailForm = (data) => {
  void sendVoteReceiptEmail(data).catch((err) =>
    console.error('Vote receipt email: unhandled error', err)
  );
};

export default EmailForm;
