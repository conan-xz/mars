FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# 先安装所有依赖生成lock文件（仅用于构建阶段）
RUN npm install
# 然后执行生产环境安装
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "app.js"] 
