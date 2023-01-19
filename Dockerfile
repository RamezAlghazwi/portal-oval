FROM node:16.14
COPY . /home/node/portal-oval
WORKDIR /home/node/portal-oval
#ENV NODE_OPTIONS="--openssl-legacy-provider --no-experimental-fetch"
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve"]
