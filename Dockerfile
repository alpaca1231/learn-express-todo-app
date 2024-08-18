FROM node:20.10.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

CMD if [ "$NODE_ENV" = "development" ] ; then \
      npm run dev ; \
    else \
      npm run build && npm run start ; \
    fi
