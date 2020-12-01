FROM node:15.3.0-alpine3.12

# Create app directory
WORKDIR /usr/src/app

COPY sources/ ./
COPY start.sh /tmp/

RUN npm install

ENTRYPOINT [ "/bin/sh", "/tmp/start.sh" ]