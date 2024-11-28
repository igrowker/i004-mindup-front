#!/bin/bash

# Sustituir las variables de entorno en el archivo de configuración
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Iniciar NGINX
nginx -g 'daemon off;'
