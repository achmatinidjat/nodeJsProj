const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    app: {
        rabbitURL: process.env.RABBIT_URL || 'amqp://localhost'
    },
    email: {
        login: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS
    }
};