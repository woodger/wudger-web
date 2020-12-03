FROM alpine
WORKDIR /app
COPY . .

RUN apk add yarn \
  && yarn \
  && yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
