FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /tests

COPY package*.json ./
COPY playwright.config.ts ./
COPY e2e ./e2e

RUN npm ci
RUN npx playwright install --with-deps

CMD ["npx", "playwright", "test", "--reporter=html"]