// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';


// Configuração do servidor
const app = express();
const PORT = 4000;
const reportPath = path.join(__dirname, 'report.json');

// Middlewares
app.use(cors());             // Permite requisições de outros domínios
app.use(express.json());     // Parse do body JSON

app.post('/api/report', (req: Request, res: Response) => {
  try {
    const testResults = req.body;
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    res.status(200).json({ message: 'Relatório recebido com sucesso', data: testResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar relatório' });
  }
});

app.get('/api/report', (req, res) =>{
  try {
    if (fs.existsSync(reportPath)) {
      const data = fs.readFileSync(reportPath, 'utf-8');
      const json = JSON.parse(data);
      res.json(json);
    } else {
      res.status(404).json({ error: 'Arquivo de relatório não encontrado.' });
    }
  } catch (err) {
    console.error('Erro ao ler o arquivo de relatório:', err);
    res.status(500).json({ error: 'Falha ao carregar o relatório.' });
  }
})


app.use(express.static(path.join(__dirname, 'build')));
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
