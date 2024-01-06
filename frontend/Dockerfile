FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
EXPOSE 24678


# ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "run", "dev"]