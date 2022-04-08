# pull official base image
FROM node:16.14.0-alpine3.15

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ../package.json ./
COPY ../package-lock.json ./

RUN mkdir -p /app/node_modules
RUN chown -R node:node /app/node_modules

RUN npm install --silent