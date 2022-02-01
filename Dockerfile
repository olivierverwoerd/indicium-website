FROM node:lts-alpine

RUN apk add g++ make python3 py3-pip

ARG NUXT_ENV_BRANCH
ENV APP_ROOT /home/appuser
ENV HOST 0.0.0.0

EXPOSE 3000

RUN mkdir /home/appuser
RUN adduser -D -s /bin/bash -h /home/appuser appuser

WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install
RUN npm rebuild node-sass
RUN NUXT_ENV_BRANCH=$NUXT_ENV_BRANCH npm run build

USER appuser

CMD ["npm", "start"]
