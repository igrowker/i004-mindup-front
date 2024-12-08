# Usa una imagen base de Node.js para instalar dependencias
FROM node:20.14.0 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json e instala las dependencias
COPY package*.json ./

# Configura el registro y fuerza una instalación limpia de dependencias
RUN npm config set registry https://registry.npmmirror.com && npm ci --prefer-dedupe --legacy-peer-deps

# Copia el resto de los archivos de la aplicación y ejecuta el script de construcción
COPY . .
RUN npm run build 

# Usa una imagen ligera de Nginx para servir los archivos estáticos de producción
FROM nginx:stable-alpine

# Copia el archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos de la aplicación construida desde el paso anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para el servidor web
EXPOSE 80

# Comando para iniciar Nginx en primer plano, evitando que el contenedor se detenga
CMD ["/bin/sh", "-c", "envsubst '${NGINX_SERVER_NAME}' < /etc/nginx/nginx.conf > /etc/nginx/nginx_resolved.conf && nginx -g 'daemon off;'"]
