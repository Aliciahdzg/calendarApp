FROM node:19-alpine3.16 AS development
ENV NODE_ENV development
WORKDIR /app

COPY package.json ./
COPY yarn.lock .
RUN yarn install --legacy-peer-deps --silent
COPY . ./
RUN yarn build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]