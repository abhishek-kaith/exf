FROM node:18-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm npm
RUN pnpm install 
RUN env
COPY . .
EXPOSE ${PORT} 

CMD [ "pnpm", "start" ]
