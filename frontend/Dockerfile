FROM nginx:alpine
COPY build/ /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html && \
chown -R nginx:nginx /usr/share/nginx/html

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

