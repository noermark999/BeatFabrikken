import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bfabrikkensupp@gmail.com',
    pass: 'beatSupport!19A'
  }
});


async function sendConfirmationEmail(email, bookingDetails){
  const mailOptions = {
    from: 'bfabrikkensupp@gmail.com',
    to: email,
    subject: 'Booking bekræftelse',
    text: `Hej, din booking er bekræftet. Detaljer: ${bookingDetails}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sendt success')
  } catch (error) {
    console.error('Fejl ved afsending af mail:', error);
  }
}

export {sendConfirmationEmail}