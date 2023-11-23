import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'bfabrikkensupp@gmail.com',
    pass: 'beatSupport!19A',
    clientId: '102469286526-07rroo37loa3j0bu20jaj3eac2buqqan.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04sLvKU_zRQiLCgYIARAAGAQSNwF-L9IrXS-u9k-wseDdSbzxQWO889OSo7keeby-q5AFodacXV4HYYiLzX9Bvx-n-58795sEi4Q'
  }
});


async function sendConfirmationEmail(email){
  const mailOptions = {
    from: 'bfabrikkensupp@gmail.com',
    to: email,
    subject: 'Booking bekræftelse',
    text: `Hej, din booking er bekræftet. Detaljer:`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sendt success')
  } catch (error) {
    console.error('Fejl ved afsending af mail:', error);
  }
}

export default {sendConfirmationEmail}