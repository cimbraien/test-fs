FROM node:20.8.0-alpine
WORKDIR /root/app
COPY . ./
RUN yarn setup
EXPOSE 8080
CMD ["yarn", "start"]