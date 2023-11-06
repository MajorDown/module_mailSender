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
  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/send-email", {
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
        setTimeout(() => setFormLog(""), 5000);
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
        <label htmlFor="MSEmail">Renseignez votre email :</label>
        <input
          type="email"
          id="MSEmail"
          required
          value={inputEmail}
          onChange={setInputEmail}
        />
        <label htmlFor="MSPhone">Renseigner votre numéro de tel :</label>
        <input
          type="tel"
          id="MSPhone"
          required
          value={inputPassword}
          onChange={setInputPassword}
        />
        <label htmlFor="MSMessage">Ecrivez ici votre message</label>
        <input
          type="text"
          id="MSMessage"
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
