#Compile
FROM node:15.13-alpine

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

#Production
FROM nginx:1.21-alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]