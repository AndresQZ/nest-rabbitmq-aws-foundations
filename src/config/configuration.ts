export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitMQ: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.RABBITMQ_USER,
    credencial : process.env.RABBIMQ_PASSWORD,
    connection: process.env.RABBIMQ_CONNECTION
  }
});