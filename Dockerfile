# Etapa de build
FROM mcr.microsoft.com/playwright:v1.56.0-focal AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY playwright.config.ts ./

# Instalar dependências
RUN npm ci

# Copiar todos os outros arquivos do projeto
COPY . .

# Comando padrão para rodar os testes
CMD ["npx", "playwright", "test"]
