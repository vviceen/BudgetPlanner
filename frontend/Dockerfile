FROM nginx:1.24-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

EXPOSE 80