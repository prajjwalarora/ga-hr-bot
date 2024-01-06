FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 7000
ENV NODE_OPTIONS=--max_old_space_size=2048
CMD ["npm","run","watch"]
