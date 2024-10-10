# Use an official Node.js runtime as the base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the working directory in the container
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]

