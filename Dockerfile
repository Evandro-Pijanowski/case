# Etapa de build
FROM mcr.microsoft.com/playwright:v1.56.1

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY playwright.config.ts ./

# Instalar dependências
ENV NODE_ENV=development
RUN npm ci
RUN npm install @playwright/test@1.56.1
RUN npx playwright install --with-deps

# Copiar todos os outros arquivos do projeto
COPY . .

RUN chmod +x ./node_modules/.bin/* || true

# Comando padrão para rodar os testes
CMD ["npx", "playwright", "test"]
