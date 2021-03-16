FROM node:12.18.1

# set default port 
ENV PORT=5000

# set app dir
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# copy complete project
COPY . ./

# generate optimized build for production
RUN npm run build

# generate api docs --> swagger.output file
RUN npm run swagger-autogen
    
# run server
CMD [ "node", "dist/server.js" ]