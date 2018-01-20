FROM node:9.3.0

# Create app directory
WORKDIR /usr/src/app

COPY sources/public_html/ ./

RUN npm install

HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost:8080 || exit 1

EXPOSE 8080
CMD [ "nodejs", "/usr/src/app/server.js" ]
