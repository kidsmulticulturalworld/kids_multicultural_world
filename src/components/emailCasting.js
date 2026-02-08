import axios from 'axios';
import emailjs from 'emailjs-com';

const EmailCasting = async(info) => {
    console.log(info)
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/get_casting_info`,
        {id:info}
    );
    console.log(data)
    
    const sendEmail = async () => {
        try {
          const templateParams = {
            to_email: 'kidsmulticulturalworldkmw@gmail.com',
            subject: 'Runway Registration',
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            parent_name: data.parent_name,
            image_base64: data.image,
          };
    
          await emailjs.send(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE3,
            templateParams,
            process.env.REACT_APP_SECRETE
          );
    
        } catch (error) {
          console.error('Failed to send email:', error);
        } finally {
        }
    };
    sendEmail()
};

export default EmailCasting;
