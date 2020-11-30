FROM node:10

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /src/app

COPY app /src/app/

# Placing the build here for now because 
RUN npm install && \
    npm run build

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

#CMD ["npm", "start"]