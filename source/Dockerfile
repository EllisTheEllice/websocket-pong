FROM node:9.3.0

# Create app directory
WORKDIR /usr/src/app

COPY sources/ ./
COPY init/ /tmp/

RUN npm install

ENTRYPOINT [ "/bin/sh", "/tmp/init.sh" ]
