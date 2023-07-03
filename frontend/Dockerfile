#Compile
FROM node:18.16-alpine AS build

WORKDIR /frontend

COPY . .

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

#Production
FROM nginx:1.21-alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]