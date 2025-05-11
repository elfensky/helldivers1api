FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# update npm
RUN npm install -g npm@latest

# Copy project
COPY . .

# Debug: List files in the /app directory
RUN echo "Listing files in /app:" && ls -la /app

RUN npm ci
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]