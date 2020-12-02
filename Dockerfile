FROM alpine
WORKDIR /app
COPY . .

RUN apk add nodejs yarn \
  && yarn \
  && yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
