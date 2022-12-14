FROM node:18.12.1
COPY . /portal-oval
WORKDIR /portal-oval
#RUN npm ci --legacy-peer-deps
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
RUN npm run build
CMD ["npm", "start"]
