import React, { useState, useEffect } from "react";

const MailSender = () => {
  // STATES
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [inputMessage, setInputMessage] = useState();
  const [formLog, setFormLog] = useState("");

  // EFFECTS
  useEffect(() => {
    if (formLog) {
      setTimeout(() => {
        setFormLog("");
      }, 10000);
    }
  }, [formLog]);

  // HANDLERS
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("API_URL/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          phone: inputPassword,
          message: inputMessage,
        }),
      });
      const data = await response.json();
      if (data.message === "E-mail envoyé avec succès.") {
        setInputEmail("");
        setInputPassword("");
        setInputMessage("");
        setFormLog("E-mail envoyé avec succès !");
      }
    } catch (error) {
      // En cas d'erreur lors de la requête, afficher le message d'erreur
      setFormLog("Une erreur est survenue lors de l'envoi de l'e-mail.");
    }
  };

  // RENDER
  return (
    <div id="mailSender">
      <form onSubmit={(event) => handleSendMessage(event)}>
        <label htmlFor="email">Renseignez votre email :</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={inputEmail}
          onChange={setInputEmail}
        />
        <label htmlFor="phone">Renseigner votre numéro de tel :</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          value={inputPassword}
          onChange={setInputPassword}
        />
        <label htmlFor="message">Ecrivez ici votre message</label>
        <input
          type="text"
          name="message"
          id="message"
          required
          value={inputMessage}
          onChange={setInputMessage}
        />
        <input type="submit" value="Envoyer votre message" />
        {formLog && <p className="log">{formLog}</p>}
      </form>
    </div>
  );
};

export default MailSender;
