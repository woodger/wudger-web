FROM alpine
WORKDIR /app

COPY . .

RUN apk add ca-certificates yarn \
  && yarn install && yarn build

EXPOSE 3000
CMD [ "sh", "entrypoint.sh" ]
