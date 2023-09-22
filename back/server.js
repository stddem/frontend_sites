const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Настройки SMTP-сервера
const smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'noreply@gosu.kz',
      pass: 'gwllcrcwhcggoeny'
    }
};

// Маршрут для отправки письма
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Создание объекта для отправки письма
  const transporter = nodemailer.createTransport(smtpConfig);

  // Опции письма
  const mailOptions = {
    from: email,
    to: 'recipient@example.com', // Адрес получателя
    subject: 'Новое сообщение с формы контактов',
    html: `<h2>Новое сообщение</h2>
           <p><strong>Имя:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Сообщение:</strong><br>${message}</p>`
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при отправке письма.' });
    } else {
      console.log('Письмо успешно отправлено:', info.response);
      res.json({ message: 'Письмо успешно отправлено.' });
    }
  });
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}.`);
});