FROM strapi/base

ARG STRAPI_VERSION
RUN yarn global add strapi@${STRAPI_VERSION}

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app

WORKDIR /src/app

COPY app /src/app/

# Placing the build here for now because 
RUN cd plugins/wysiwyg/ && \
    npm install && \
    cd ../../ && \
    npm install pg --save && \
    npm install && \
    npm run build

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

#CMD ["npm", "run", "start"]