# Usa a imagem oficial do Playwright (com browsers e Node pré-instalados)
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# Define o diretório de trabalho
WORKDIR /tests

# Copia os arquivos do projeto
COPY package*.json ./
COPY playwright.config.ts ./
COPY tests ./tests

# Instala dependências do projeto
RUN npm ci

# Instala browsers do Playwright (Chromium, Firefox, WebKit)
RUN npx playwright install --with-deps

# Executa os testes por padrão
CMD ["npx", "playwright", "test", "--reporter=html"]