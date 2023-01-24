# Base image : where out apps will running
FROM node:latest

# Working Directory: where our apps will be placed
WORKDIR /app

# copy package.json workdir
COPY package.json .

# A 
RUN npm install

#  opy all files into workdir
COPY . .

# port in docker (NOt in localhost)
EXPOSE 5005

CMD ["npm", "start"]