FROM node:18-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Ensuring environment variables are provided at runtime:
# - DB_PATH 
# - JWT_SECRET
# - any others...

# Expose your server port
EXPOSE 3001

# Run the app
CMD ["npm", "start"]
