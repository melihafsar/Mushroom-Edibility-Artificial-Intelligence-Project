FROM node:20-slim as build
WORKDIR /app
COPY ./frontend .
RUN npm i 
RUN npm run build


FROM python:3.9 as final
WORKDIR /app
COPY ./backend .
RUN pip install --no-cache-dir -r requirements.txt
COPY --from=build /app/dist dist
EXPOSE 8000
CMD ["fastapi", "run", "api.py"]