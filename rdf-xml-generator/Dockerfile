# Use the official Caddy image as a base image
FROM caddy:alpine

# Copy the content of the local directory to the container's /usr/share/caddy directory
# Caddy will automatically serve files from this location
COPY . /usr/share/caddy

# Expose port 80 (HTTP) and 443 (HTTPS) to make the web server accessible
EXPOSE 80 443
