# Build stage 1
# Staging Docker image
FROM node:14.17-alpine as appbuild
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]

