FROM node:16 as compile
WORKDIR /api
COPY ./package.json .
RUN yarn

COPY . .
RUN yarn build
FROM node:16
WORKDIR /app
COPY --from=compile ./api/package.json ./
COPY --from=compile ./api/dist/. ./
COPY --from=compile ./api/.env ./
COPY --from=compile ./api/prisma ./
RUN yarn --prod
RUN npx prisma generate


CMD ["yarn","start"]