FROM node:20-alpine as build
WORKDIR /app
COPY ./frontend .
RUN npm i 
RUN npm run build


FROM python:3.9-alpine as final
WORKDIR /app
COPY ./backend .
RUN pip install -r requirements.txt
COPY --from=build /app/dist dist
EXPOSE 8000
CMD ["fastapi", "run", "api.py"]