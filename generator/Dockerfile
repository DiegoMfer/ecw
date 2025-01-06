# Use the official Nginx image as a base image
FROM nginx:alpine

# Copy the content of the local directory to the container's /usr/share/nginx/html directory
# This will make Nginx serve the files in /your-project
COPY . /usr/share/nginx/html

# Expose port 80 to make the web server accessible
EXPOSE 80
