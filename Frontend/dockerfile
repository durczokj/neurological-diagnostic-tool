FROM node:21-alpine3.18


WORKDIR /usr/src/neurotool
COPY  package*.json ./
COPY pg_root.crt ./

RUN npm config set cafile "./pg_root.crt"

RUN npm install

COPY  . .

EXPOSE 5173

CMD ["npm", "run", "dev"]