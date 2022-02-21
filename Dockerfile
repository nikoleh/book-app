FROM node:16

WORKDIR /usr/src/app

# Copy server app's project files and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy frontend app's project files and install dependencies
COPY frontend/package*.json ./frontend/
RUN npm --prefix ./frontend install

# Copy server app's source code and build it
COPY server .
RUN npm run build

# Copy frontend app's source code and build it
COPY frontend ./frontend
RUN npm --prefix ./frontend run build

# Tell server app from where to serve frontend
ENV STATIC_FILES_LOCATION=frontend/build

CMD ["node","index.js"]