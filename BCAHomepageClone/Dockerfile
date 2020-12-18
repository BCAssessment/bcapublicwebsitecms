FROM node:10 AS builder

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /src/app

COPY app /src/app/

RUN npm install && \
    npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /src/app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# COPY docker-entrypoint.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT ["docker-entrypoint.sh"]

# #CMD ["npm", "start"]