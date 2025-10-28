import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';


interface TestResults {
  totalRequests: number;
  successful: number;
  minResponseTime: number;
  maxResponseTime: number;
  avgResponseTime: number;
  tookTooLong: number;
  threshold: number;
  loadLevel: string;
  endpoint: string;
  timestamp: string;
}


interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

const LoadTestReport: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/report')
      .then((res) => res.json())
      .then((data) => setTestResults(data))
      .catch((err) => console.error('Erro ao buscar relatório:', err));
  }, []);

  if(!testResults){
    return <p>Carregando</p>
  }

  const successRate: number = parseFloat(((testResults.successful / testResults.totalRequests) * 100).toFixed(1));
  const slowRequestsRate: number = parseFloat(((testResults.tookTooLong / testResults.totalRequests) * 100).toFixed(1));
  const failedRequests: number = testResults.totalRequests - testResults.successful;

  const responseTimeData: ChartData[] = [
    { name: 'Mínimo', value: testResults.minResponseTime, color: '#10b981' },
    { name: 'Média', value: testResults.avgResponseTime, color: '#3b82f6' },
    { name: 'Máximo', value: testResults.maxResponseTime, color: '#ef4444' },
    { name: 'Threshold', value: testResults.threshold, color: '#f59e0b' }
  ];

  const successData: ChartData[] = [
    { name: 'Sucesso', value: testResults.successful, color: '#10b981' },
    { name: 'Falha', value: failedRequests, color: '#ef4444' }
  ];

  const performanceData: ChartData[] = [
    { name: 'Dentro do Limite', value: testResults.totalRequests - testResults.tookTooLong, color: '#10b981' },
    { name: 'Acima do Limite', value: testResults.tookTooLong, color: '#f59e0b' }
  ];

  const getStatusColor = (value: number, threshold: number, reverse: boolean = false): string => {
    if (reverse) {
      return value >= threshold ? 'text-green-600' : 'text-red-600';
    }
    return value <= threshold ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Relatório de Teste de Carga</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Endpoint: </span>
              <span className="ml-2 font-bold text-gray-800">{testResults.endpoint}</span>
            </div>
            <div>
              <span className="text-gray-600">Nível de Carga: </span>
              <span className="ml-2 font-bold text-gray-800 uppercase">{testResults.loadLevel}</span>
            </div>
            <div>
              <span className="text-gray-600">Threshold: </span>
              <span className="ml-2 font-bold text-gray-800">{testResults.threshold}ms</span>
            </div>
            <div>
              <span className="text-gray-600">Data/Hora: </span>
              <span className="ml-2 font-bold text-gray-800">{new Date(testResults.timestamp).toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
        {/* Análise e Recomendações */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Análise e Recomendações</h2>
          <div className="space-y-4">
            {successRate < 95 && (
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Taxa de Sucesso Baixa</h3>
                  <p className="text-sm text-red-700">
                    A taxa de sucesso está abaixo de 95%. Investigue os erros retornados e verifique a estabilidade do servidor.
                  </p>
                </div>
              </div>
            )}
            
            {testResults.avgResponseTime > testResults.threshold && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Tempo Médio Acima do Threshold</h3>
                  <p className="text-sm text-yellow-700">
                    O tempo médio de resposta excede o threshold definido. Considere otimizações de performance no backend ou infraestrutura.
                  </p>
                </div>
              </div>
            )}
            
            {testResults.tookTooLong > testResults.totalRequests * 0.1 && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-1">Alto Número de Requisições Lentas</h3>
                  <p className="text-sm text-orange-700">
                    Mais de 10% das requisições excederam o threshold. Verifique gargalos no processamento e considere cache ou scaling horizontal.
                  </p>
                </div>
              </div>
            )}
            
            {successRate >= 95 && testResults.avgResponseTime <= testResults.threshold && testResults.tookTooLong <= testResults.totalRequests * 0.1 && (
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Performance Excelente!</h3>
                  <p className="text-sm text-green-700">
                    O endpoint está performando dentro dos parâmetros esperados. Continue monitorando em produção.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-bold">Taxa de Sucesso </span>
              {successRate >= 95 ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <XCircle className="w-7 h-7 text-red-600" />
              )}
            </div>
            <div className={`text-3xl font-bold ${getStatusColor(successRate, 95, true)}`}>
              {successRate}% ({testResults.successful} de {testResults.totalRequests} requisições)
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-bold">Tempo Médio </span>
              {testResults.avgResponseTime <= testResults.threshold ? (
                <CheckCircle className="w-3 h-3 text-green-600" />
              ) : (
                <XCircle className="w-3 h-3 text-red-600" />
              )}
            </div>
            <div className={`text-3xl font-bold ${getStatusColor(testResults.avgResponseTime, testResults.threshold)}`}>
              {testResults.avgResponseTime}ms
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-bold">Tempo Máximo </span>
              <Clock className="w-3 h-3 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {testResults.maxResponseTime}ms (Pior caso registrado)
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-bold">Requisições Lentas </span>
              {testResults.tookTooLong > 0 ? (
                <AlertTriangle className="w-3 h-3 text-yellow-600" />
              ) : (
                <CheckCircle className="w-3 h-3 text-green-600" />
              )}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {testResults.tookTooLong} ({slowRequestsRate}% acima do threshold)
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Tempos de Resposta */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tempos de Resposta</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {responseTimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Taxa de Sucesso */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Distribuição de Resultados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: any) => {
                    const total = successData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((value / total) * 100).toFixed(0);
                    return `${name}: ${percent}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Análise de Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: any) => {
                    const total = performanceData.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((value / total) * 100).toFixed(0);
                    return `${name}: ${percent}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Resumo Detalhado */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo Detalhado</h2>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Total de Requisições: </span>
                  <span className="font-bold text-gray-800">{testResults.totalRequests}</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Requisições Bem-sucedidas: </span>
                  <span className="font-bold text-green-600">{testResults.successful}</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Requisições Falhadas: </span>
                  <span className="font-bold text-red-600">{failedRequests}</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Tempo Mínimo: </span>
                  <span className="font-bold text-gray-800">{testResults.minResponseTime}ms</span>
                </div>
              </div>
              <div className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Tempo Máximo: </span>
                  <span className="font-bold text-gray-800">{testResults.maxResponseTime}ms</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-600">Requisições Lentas: </span>
                  <span className="font-bold text-yellow-600">{testResults.tookTooLong}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadTestReport;