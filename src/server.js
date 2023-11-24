const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/somaDias/:tipo/:quantidadeDias', (req, res) => {
  const { tipo, quantidadeDias } = req.params;

  if (isNaN(quantidadeDias) || quantidadeDias <= 0) {
    return res.status(400).json({ error: 'Informe um número inteiro positivo' });
  }

  const dataAtual = new Date();
  let resultado;

  if (tipo === 'uteis') {
    let diasParaSomar = parseInt(quantidadeDias, 10);

    if (isNaN(diasParaSomar) || diasParaSomar <= 0) {
      return res.status(400).json({ error: 'INVÁLIDO. Informe "uteis" ou "corridos' });
    }

    while (diasParaSomar > 0) {
      dataAtual.setDate(dataAtual.getDate() + 1);

      if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
        diasParaSomar--;
      }
    }

    resultado = dataAtual.toISOString().split('T')[0];
  }else if (tipo === 'corridos'){
    resultado = somarDiasCorridos(dataAtual, parseInt(quantidadeDias));
  } else {
    return res.status(400).json({ error: 'INVÁLIDO. Informe "uteis" ou "corridos".' });
  }

  res.json({ resultado });
});

function somarDiasCorridos(dataAtual, quantidadeDias) {
  const milissegundosPorDia = 24 * 60 * 60 * 1000;
  const data = new Date(dataAtual);
  const milissegundosAdicionados = quantidadeDias * milissegundosPorDia;
  const novaData = new Date(data.getTime() + milissegundosAdicionados);

  return novaData.toISOString().split('T')[0];
}

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}.`);
});


/*
app.get('/somaDiasUteis/:numeroDias', (req, res) => {
  const { numeroDias } = req.params;

  let diasParaSomar = parseInt(numeroDias, 10); //tive que converter caso quisesse mandar o valor númerico direto no path

  if (isNaN(diasParaSomar) || diasParaSomar <= 0) {
    return res.status(400).json({ error: 'Informe um número inteiro positivo' });
  }

 const dataAtual = new Date();

  while (diasParaSomar > 0) {
    dataAtual.setDate(dataAtual.getDate() + 1);

    if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
      diasParaSomar--; //Se o dia atual não é sábado nem domingo, diasprasomar é decrementada em um, pulando o fds e somando em uma nova data útil
    }
  }

  const dataFormatada = dataAtual.toISOString().split('T')[0];

  res.json({ dataResultado: dataFormatada });
});


app.get('/somaDiasCorridos/:quantidadeDias', (req, res) => {
  const { quantidadeDias } = req.params;

  if (isNaN(quantidadeDias)) {
    return res.status(400).json({ error: 'Informe um número inteiro positivo' });
  }

  const dataAtual = new Date()
  const novaData = somarDiasCorridos(dataAtual, parseInt(quantidadeDias));

  res.json({novaData});
});

function somarDiasCorridos(dataAtual, quantidadeDias){
  const milissegundosPorDia = 24 * 60 * 60 * 1000; //calcula mutiplicando o número de horas em um dia, pelos minutos em uma hora e pelos segundos em um minuto e pelos milissegundos em um segundo
  const data = new Date(dataAtual);
  const milissegundosAdicionados =  quantidadeDias * milissegundosPorDia; //calcula mutiplicando a quantidade de dias pelo número de milissegundos em um dia
  const novaData = new Date(data.getTime() + milissegundosAdicionados);

  return novaData.toISOString().split('T')[0];
}

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}.`);
});
*/