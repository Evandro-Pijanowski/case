# Etapa de build
FROM node:20-bookworm

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY playwright.config.ts ./

# Instalar dependências
ENV NODE_ENV=development
RUN npm ci
RUN npx -y playwright@1.56.1 install --with-deps

# Copiar todos os outros arquivos do projeto
COPY . .

RUN chmod +x ./node_modules/.bin/* || true

# Comando padrão para rodar os testes
CMD ["npx", "playwright", "test"]
