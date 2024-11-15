# Dockerfile
# Usa una imagen base de Node.js para instalar dependencias# Usa una imagen base de Node.js para instalar dependencias
FROM node:18-alpine AS build

# Establece el directorio de trabajo en /app# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json e instala las dependencias
COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3000

CMD ["nmp", "run", "build"]

# Usa una imagen ligera de Nginx para servir los archivos estáticos de producción
FROM nginx:stable-alpine

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos de la aplicación construida desde el paso anterior
COPY --from=build /app/build /usr/share/nginx/html


# Expone el puerto 80 para el servidor web
EXPOSE 80


# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
