# Base Image: Where our apps will running 
FROM node:latest

# Working Directory: Where our apps will be placed
WORKDIR /app 

# Copy package.json into Workdir
COPY package.json . 

# A
RUN npm install

# Copy all files into Workdir
COPY . .

# Port in Docker (Not in localhost)
EXPOSE 5005 

CMD ["npm", "start"]