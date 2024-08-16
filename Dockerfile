FROM node:21.7-alpine as build

RUN apk add --update git nano curl python3 py3-setuptools make g++\
   && rm -rf /var/cache/apk/*

WORKDIR /app

# Root monorepo package
COPY lerna.json package*.json ./

# Dev Panel
COPY packages/yii-dev-panel/package*.json packages/yii-dev-panel/

# Dev Panel SDK
COPY packages/yii-dev-panel-sdk/package*.json packages/yii-dev-panel-sdk/

# Dev Toolbar
COPY packages/yii-dev-toolbar/package*.json packages/yii-dev-toolbar/

RUN npm install

COPY . .

ARG VITE_BUILD_ID
ENV VITE_BUILD_ID=$VITE_BUILD_ID

RUN npm run build:dev

CMD ["npm", "run", "serve:dev"]
