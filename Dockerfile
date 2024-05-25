FROM node:20-alpine 
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]