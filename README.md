# Setup
## Backend
### Run with docker
Build docker image:

```console
$ docker build -t klontong-backend
```

Run a docker container using the image:

```console
$ docker run -p 8080:8080 -d klontong-backend
```
**PS** Don't forget to add custom environment variables on the step above 

<br>

### Run with Nodejs
(Optional) Install yarn:
```console
$ npm i -g yarn
```

If you have yarn installed, run setup script to install depencies and build the app, then start the app:
```console
$ yarn setup
$ yarn start
```

Otherwise, do:
```console
$ npm install
$ npm run build
$ node ./dist/app.js
```

## Frontend
(Optional) Install yarn:
```console
$ npm i -g yarn
```

Install the dependencies:
```console
$	yarn install
```
or
```console
$ npm install
```

### Start development server
```console
$ yarn start
```
or
```console
$ npm run start
```