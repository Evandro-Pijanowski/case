FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /tests

COPY package*.json ./
COPY playwright.config.ts ./


RUN npm ci

COPY . .

RUN npx playwright install --with-deps

ENV NODE_ENV=ci

CMD ["npx", "playwright", "test", "--reporter=html"]