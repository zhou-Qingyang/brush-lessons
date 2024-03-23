FROM nginx:latest

# 将本地的 nginx.conf 文件复制到镜像中的 /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# 将前端代码复制到镜像中的 /usr/share/nginx/html 目录
COPY . /usr/share/nginx/html

# 暴露 443 端口
EXPOSE 4495

# 启动 nginx 服务
CMD ["nginx", "-g", "daemon off;"]
