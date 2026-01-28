### 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Video de apresentação do projeto: https://www.loom.com/share/d92ec87f5d9f497caac48193a5026c33

### 📋 Pré-requisitos

```
Node
Docker
Git
```

### 🔧 Instalação

Para configurar o ambiente e executar os testes, siga os passos abaixo:

```
#Clonar o repositorio
git clone https://github.com/pija-evandro/case.git
cd case
```
```
#Instale as dependências
npm install
```
```
#Instale os navegadores
npx playwright install
```

### ⚙️ Executando os testes localmente

```
#Iniciar servidor para relatório de Load test
npx playwright test
npx ts-node server.ts
```
```
#Executar todos os testes
npx playwright test
```
```
#Executar teste especifico ex:
npx playwright test booking.spec.ts
```
```
#Ver relatório de teste HTML
npx playwright show-report
```
```
#Ver relatório de Load test
Acesse http://localhost:4000/
```

### ⚙️ Executando os testes com Docker

```
docker run --rm \
  -v "$(pwd)":/app \
  -v "$(pwd)/playwright-report":/app/playwright-report \
  -w /app \
  mcr.microsoft.com/playwright:v1.48.2-jammy \
  sh -c "npm install && npx playwright test"
```
```
#Ver relatório de teste HTML
docker run --rm -p 9323:9323 \ 
    -v "$(pwd)/playwright-report":/app/playwright-report \ 
    -w /app mcr.microsoft.com/playwright:v1.48.2-jammy \ 
    npx playwright show-report --host 0.0.0.0

Acesse http://localhost:9323/
```


### 🔩 Testes

API: Os testes cobrem endpoints de Login de Admin e CRUD de reservas. Tanto casos positivos como casos negativos
     como credenciais inválidas, dados errados na reserva e tentativa de deletar reserva inexistente. 
     Além de casos de performance e carga levando em conta o tempo de resposta da Api.
Interface: Os testes combrem fluxos de navegação, reserva de quartos, login e criação de novos quartos.
     Tanto casos positivos como negativos como crendenciais inválidas, dados errados e tratamento desses erros 
     na criação de reservas.
     Assim como testes de regressão visual.

### 📦 CI/CD

Integração com Github Actions
Cada push/PR inicia execução automática dos testes em container Docker
Relatório de teste publicado automaticamente no Gihtub Pages

### Estrutura do Projeto

```
DesafioVoidr/
┣ .github/
┃ ┗ workflows/
┃   ┗ playwright.yml              # Configuração do CI/CD para rodar testes automaticamente no GitHub Actions.
┣ build/                          # Contém os arquivos estáticos do front-end.
┃ ┣ static/
┃ ┃ ┗ js/
┃ ┃   ┣ main.2e13966d.js
┃ ┃   ┣ main.2e13966d.js.LICENSE.txt
┃ ┃   ┗ main.2e13966d.js.map
┃ ┣ asset-manifest.json
┃ ┗ index.html
┣ src/                             # Código-fonte principal da aplicação React/TypeScript.
┃ ┣ App.tsx
┃ ┣ index.tsx
┃ ┗ loadTestReporter.tsx           # Componente responsável por exibir relatórios de load tests.
┣ tests/                           # Contém todos os testes automatizados.
┃ ┣ api/                           # Testes de API e utilitários.
┃ ┃ ┣ specs/                       # Casos de teste de API (autenticação, booking, performance, CRUD).
┃ ┃ ┃ ┣ booking.spec.ts 
┃ ┃ ┃ ┣ auth.spec.ts                
┃ ┃ ┃ ┣ deleteBooking.spec.ts
┃ ┃ ┃ ┣ performanceApi.spec.ts
┃ ┃ ┃ ┗ updateBooking.spec.ts
┃ ┃ ┗ utils/                       # Arquivos auxiliares e dados em JSON usados pelos testes de API.
┃ ┃   ┣ bookerJson.ts
┃ ┃   ┣ booking.json
┃ ┃   ┣ credentials.json
┃ ┃   ┣ performanceConfig.ts
┃ ┃   ┗ schemaValidator.ts
┃ ┗ e2e/                           # Testes de interface (end-to-end).
┃   ┣ fixtures/                    # Dados de teste compartilhados entre cenários.
┃   ┃ ┗ testData.ts
┃   ┣ pages/                       # Page Objects para estruturar interações com a UI.
┃   ┃ ┣ adminLoginPage.ts
┃   ┃ ┣ adminMessagesPage.ts
┃   ┃ ┣ adminPortalPage.ts
┃   ┃ ┣ bookingPage.ts
┃   ┃ ┣ homePage.ts
┃   ┃ ┣ messagesPage.ts
┃   ┃ ┗ roomPage.ts
┃   ┗ specs/                        # Casos de teste E2E e snapshots visuais para verificação.
┃     ┣ homePage.spec.ts-snapshots/
┃     ┃ ┣ compara.png
┃     ┃ ┣ expectedBookingNav-chromium-win32.png
┃     ┃ ┣ expectedBookingNav-firefox-win32.png
┃     ┃ ┣ expectedBookingNav-webkit-win32.png
┃     ┃ ┣ homePage-chromium-win32.png
┃     ┃ ┣ homePage-firefox-win32.png
┃     ┃ ┗ homePage-webkit-win32.png
┃     ┣ admin.spec.ts
┃     ┣ adminPortal.spec.ts
┃     ┣ booking.spec.ts
┃     ┗ home.spec.ts
┣ .env                               # Variáveis de ambiente do projeto.
┣ .gitignore                    
┣ Dockerfile                         # Configuração para containerizar a aplicação e rodar testes Playwright.
┣ globalSetup.ts                     # Script de setup global para testes Playwright.
┣ package-lock.json                  # Dependências e scripts do projeto
┣ package.json                       # Dependências e scripts do projeto
┣ playwright.config.ts               # Configuração do Playwright   
┣ README.md                          # Documentação do projeto
┣ report.json                        # Arquivo com resultados de testes (gerado após execução).
┣ server.ts                          # Servidor do relatório e API GET/POST dos resultados do Loadtest   
┗ tsconfig.json                      # Configurações do TypeScript
```

---
Por [Evandro Pijanowski](https://github.com/pija-evandro) 
