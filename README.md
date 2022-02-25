# Book app
A little project for fetching a book data and inspecting it in a frontend. The project consists of a server app and a frontend app. Book data comes from NY Times' Books API.

# Technologies
Server app is written in Node.js with Typescript, and the frontend app is written in React with Typescript. The source codes of both apps are found in their own directories.

# Running the app
For a quick start, app can be run in Docker. The NY Times API key (with books API enabled) must be provided as an environment variable. The server listens to port 3000 inside the container.

```
docker build -t book-app .
docker run --env NY_TIMES_API_KEY=your_ny_times_api_key -p 3000:3000 book-app
```

The app is found from Docker host's port 3000 with the above command.

The server app and frontend app can also be run separately with `npm start` in their corresponding directories. The server app listens to port 3000, and the frontend app listens to port 8080 with a proxy to 3000. The server app assumes that NY_TIMES_API_KEY is found from environment.
