# AJA Frontend

## Run locally with Node
### Available Scripts

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running with Docker

### For Development

```
docker build -t dsgvo-pipeline:dev .
```

Builds the App docker image.

```
docker run -it --rm --name facet -p 3000:3000 dsgvo-pipeline:dev
```

Runs an App docker container under port 3000 in interactive mode.

### For Production

```
docker build -f Dockerfile.prod -t aja-frontend:prod .
```

Builds the App docker image.

```
docker run -d -p 3000:80 aja-frontend:prod
```

Runs an App docker container under port 3000 in detached mode.