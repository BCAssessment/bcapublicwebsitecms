FROM node:10 AS builder

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /src/app

COPY app /src/app/

RUN npm install && \
    npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /src/app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]