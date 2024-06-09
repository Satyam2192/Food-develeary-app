FROM node:18-alpine AS builder

WORKDIR /usr/src/app  

COPY package*.json ./

RUN npm install 

COPY . . 

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/server.js ./
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 8000 
CMD ["npm", "run", "run"] 