FROM node:18.11.0

# create root application folder
WORKDIR /app

# copy source code to /app folder
COPY . ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
