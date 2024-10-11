# Use an official Node.js runtime as the base image
FROM node:21

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy all project files to the working directory in the container
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]
