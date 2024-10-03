const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();

// DDDs válidos no Brasil
const validDDDs = [
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24',
  '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43',
  '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62',
  '64', '63', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77',
  '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92',
  '93', '94', '95', '96', '97', '98', '99'
];


// Configura o body-parser para receber dados do formulário
server.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta "public"
server.use(express.static(path.join(__dirname, 'public')));

// Rota para exibir o formulário na raiz "/"
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o formulário
server.post('/submit', (req, res) => {
  const {
    nome, nascimento, mae, pai, telefone, email, serie, turno, extracurricular
  } = req.body;

  // Validações
  const errors = [];

  // Campos obrigatórios
  if (!nome || !nascimento || !mae || !pai || !telefone || !email || !serie || !turno) {
    errors.push('Todos os campos obrigatórios devem ser preenchidos.');
  }

  // Validação de data de nascimento (data válida)
  const nascimentoDate = new Date(nascimento);
  if (isNaN(nascimentoDate.getTime())) {
    errors.push('Data de nascimento inválida.');
  }

  // Validação de e-mail
  if (!email.includes('@') || !email.includes('.')) {
    errors.push('E-mail inválido.');
  }

  // Validação de telefone (apenas DDDs válidos)
  const ddd = telefone.split(' ')[0];
  if (!validDDDs.includes(ddd)) {
    errors.push('DDD do telefone inválido.');
  }

  // Validação de atividades extracurriculares (no máximo 3)
  if (extracurricular && extracurricular.length > 3) {
    errors.push('Selecione no máximo 3 atividades extracurriculares.');
  }

  // Resposta ao usuário
  if (errors.length > 0) {
    // Redireciona para página de erro com mensagens
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
  } else {
    // Redireciona para página de sucesso
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
  }
});

// Inicializa o servidor
server.listen(3385, () => console.log('Server is running on http://localhost:3000'));
