const app = require('./app');

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
