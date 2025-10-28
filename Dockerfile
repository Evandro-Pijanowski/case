# Base com browsers pré-instalados
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install --force
RUN npx playwright install --with-deps

# Copia o restante do código
COPY . .do

# Permite executar testes
CMD ["npx", "playwright", "test"]
