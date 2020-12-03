FROM alpine
WORKDIR /app
COPY . .

ARG api_url

RUN export API_URL="$api_url"
RUN apk add yarn \
  && yarn \
  && yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
