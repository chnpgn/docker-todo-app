# Stage 1: Build React app
FROM node:25 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Replace default Nginx config with custom one
COPY ./nginx.conf /etc/nginx/conf.d/default.conf