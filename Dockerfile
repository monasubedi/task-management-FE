# Step 1: Use an official Node.js runtime as the base image
FROM node:20 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json yarn.lock ./

# Step 4: Install the dependencies
RUN yarn install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app for production
RUN yarn run build

# Step 7: Use a smaller web server to serve the React app
FROM nginx:alpine

# Step 8: Copy the build directory from the previous image to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the default Nginx port
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
