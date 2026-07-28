# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built output with nginx
FROM nginx:1.14
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
