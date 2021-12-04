FROM node:15-alpine

# install deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Copy deps
RUN mkdir -p /opt/web-dev-app && cp -a /tmp/node_modules /opt/web-dev-app

# Setup workdir
WORKDIR /opt/web-dev-app
COPY . /opt/web-dev-app

# run
EXPOSE 3000
CMD ["npm", "run", "dev"]