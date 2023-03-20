FROM node:16
COPY . /market
WORKDIR /market
#RUN npm ci --legacy-peer-deps
RUN npm install
RUN npm run build
CMD ["npx", "next", "start"]
#COPY node_modules/@oceanprotocol/contracts/artifacts/ /market/node_modules/@oceanprotocol/contracts/artifacts/