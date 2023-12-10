FROM node:20.9.0-bullseye AS build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

FROM node:20.9.0-bullseye

WORKDIR /app

RUN npm install -g pm2

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pm2-runtime", "start", "./dist/index.js"]
