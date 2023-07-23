const express = require("express");
const nodemailer = require("nodemailer");
const checkSiteAuthorization = require("./middlewares/checkSiteAuthorization");
require("dotenv").config();

const app = express();
app.use(express.json());

// Route pour envoyer un e-mail
app.post("/send-email", checkSiteAuthorization, (req, res) => {
  const { email, phone, message } = req.body;
  const { site } = req;

  // Configurer le transporteur d'e-mails avec les informations de l'adresse GMX dédiée
  const transporter = nodemailer.createTransport({
    host: "smtp.gmx.com",
    port: 587,
    auth: {
      user: process.env.GMX_EMAIL, // Remplacez par l'adresse e-mail GMX dédiée
      pass: process.env.GMX_PASSWORD, // Remplacez par le mot de passe de l'adresse GMX
    },
  });

  // Définir le contenu de l'e-mail
  const mailOptions = {
    from: process.env.GMX_EMAIL, // Remplacez par l'adresse e-mail GMX dédiée
    to: site.email,
    subject: `${site.url} ~> Vous avez un nouveau message`,
    html: `<p>Bonjour, vous avez reçu un nouveau message envoyé depuis <strong>${site.url}</strong></p>
    <p>Adresse email : <strong>${email}</strong></p>
    <p>Numéro de tel : <strong>${phone}</strong></p>
    <p>Message :</p>
    <p>${message}</p>
    <p>Ce message vous est transmi depuis l'API ~mailSender~</p>
    <p>En cas de difficultés ou de questions sur le fonctionnement de mailSender, n'hésitez à répondre à ce mail</p>`,
  };

  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("app ~> Erreur lors de l'envoi de l'e-mail:", error);
      res.status(500).json({
        error: "Une erreur est survenue lors de l'envoi de l'e-mail.",
      });
    } else {
      console.log("app ~> E-mail envoyé:", info.messageId);
      res.json({ message: "E-mail envoyé avec succès." });
    }
  });
});

// Démarrer le serveur
app.listen(process.env.PORT, () => {
  console.log("app ~> api lancé sur le port ", process.env.PORT);
});
