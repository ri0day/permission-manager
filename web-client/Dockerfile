FROM node:16.16.0 AS build-step

# install dependency
WORKDIR /usr/src/app
# copy web-client folder to the directory
COPY . .
# install production package and build
# RUN npm install --location=global yarn
RUN yarn install
RUN npm run build

FROM node:16.16.0-alpine
WORKDIR /usr/src/app
# install build server package
RUN npm install --global serve
# copy from build stage's build folder contens to the work dir
COPY --from=build-step /usr/src/app/build ./
# expose port
EXPOSE 3000
# run the built react
CMD [ "serve"]
