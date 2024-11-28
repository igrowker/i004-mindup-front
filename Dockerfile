# Usa una imagen base de Node.js para instalar dependencias
FROM node:current-alpine AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json e instala las dependencias
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com && npm install

# Copia el resto de los archivos de la aplicación y ejecuta el script de construcción
COPY . .
RUN npm run build && ls -al /app/dist 

# Usa una imagen ligera de Nginx para servir los archivos estáticos de producción
FROM nginx:stable-alpine

# Copia el archivo de configuración personalizado de Nginx (con la variable de entorno)
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copia el script de inicio
COPY start.sh /start.sh

# Da permisos de ejecución al script
RUN chmod +x /start.sh

# Copia los archivos de la aplicación construida desde el paso anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para el servidor web
EXPOSE 80

# Configura el contenedor para ejecutar el script de inicio
ENTRYPOINT ["/start.sh"]
