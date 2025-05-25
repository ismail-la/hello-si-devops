# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY app/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY app/ ./

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]