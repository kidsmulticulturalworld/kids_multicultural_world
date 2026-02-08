import emailjs from 'emailjs-com';

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
    
        } catch (error) {
          console.error('Failed to send email:', error);
        }
    };
    sendEmail()
};

export default EmailForm;
