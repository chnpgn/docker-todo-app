# ---------- Build Stage ----------
FROM node:25 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# API URL MUST be injected at build time
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80