# Etapa 1: Construcción
FROM node:lts AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias y limpia posibles residuos
COPY package*.json ./

# Fuerza instalación limpia (npm ci asegura que se usen solo las dependencias en package-lock.json)
RUN npm ci --prefer-dedupe --legacy-peer-deps

# Copia el resto de los archivos de la aplicación y ejecuta la construcción
COPY . .
RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:stable-alpine

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos desde la etapa 1
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["/bin/sh", "-c", "envsubst '${NGINX_SERVER_NAME}' < /etc/nginx/nginx.conf > /etc/nginx/nginx_resolved.conf && nginx -g 'daemon off;'"]
