const emailService = require("../modules/emailService.module.js");

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const result = await emailService.sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};
// exports.sendEmail = async (req, res) => {
//   const { to, subject, text } = req.body;

//   try {
//     const result = await emailService.sendEmail(to, subject, text);
//   } catch (error) {
//   }
// };
