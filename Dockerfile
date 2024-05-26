FROM node:20-slim as build
WORKDIR /app
COPY ./frontend .
RUN npm i 
RUN npm run build


FROM python:3.9-slim as final
RUN apt-get update && apt-get upgrade
WORKDIR /app
COPY ./backend .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get install -y libgl1-mesa-dev
RUN apt-get install -y libglib2.0-0
COPY --from=build /app/dist dist
EXPOSE 8000
CMD ["fastapi", "run", "api.py"]
