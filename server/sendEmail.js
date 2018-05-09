const nodemailer = require('nodemailer');
//const archive = require('../../helpers/email-helper');
var axios = require('axios');
// const config = require('../../config/config');
var cron = require('cron');
var CronJob = require('cron').CronJob;
// '*/1 * * * '
new CronJob(
  '*/1 * * * ',
  function() {
    console.log('cronjob running');
    getEmailAddresses();
  },
  null,
  true,
  'America/Los_Angeles'
);

//let result = archive.getEmails();

var getEmailAddresses = () => {
  axios
    .get(`http://localhost:3000/users`)
    .then(response => {
      console.log('Retrieved emails');
      //return response.data[1].emailaddress;
      let users = response.data;
      users.forEach(account => sendEmails(account.name));
    })
    .catch(err => {
      console.log(err);
    });
};

let sendEmails = email => {
  let transporter = nodemailer.createTransport(
    {
      host: process.env.MAIL_SRV,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USR,
        pass: process.env.MAIL_PWD
      }
    },
    {
      from: 'Your HumpDay Tasks <BeAHero@fridayhero.today>'
    }
  );

  let message = {
    to: `<${email}>`,
    subject: "Here is what you'll be doing today.",
    text: 'Visit www.humpday.com to see your tasks.',
    html:
      '<p>Visit <a href="#">www.humpday.com</a> to see find out what you\'re doing today.</p>'
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error Occurred: ', error.message);
      return process.exit(1);
    }

    console.log('Message sent');
    console.log(nodemailer.getTestMessageUrl(info));
  });
};

// getEmailAddresses();
module.exports = {
  getEmailAddresses
};
