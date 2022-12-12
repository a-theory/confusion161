FROM node:18.11.0

# create root application folder
WORKDIR /app

# copy source code to /app folder
COPY . ./

RUN npm install

EXPOSE 8080

CMD ["/bin/bash", "-c", "npm run production-db; npm run production-db:migrate; npm run production-db:seed; npm start"]
