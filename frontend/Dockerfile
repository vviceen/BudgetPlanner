#Compile
FROM node:15.13-alpine AS build

WORKDIR /frontend

COPY . .

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend ./
RUN npm run build

#Production
FROM nginx:1.21-alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]