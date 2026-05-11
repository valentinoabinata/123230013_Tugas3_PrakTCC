# Gunakan base image Node.js versi ringan
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependensi (hanya production agar lebih ringan)
RUN npm install --only=production

# Salin seluruh kode backend ke dalam container
COPY . .

# Ekspos port (Sesuai dengan process.env.PORT || 8080 di index.js)
EXPOSE 8080

# Jalankan aplikasi menggunakan script start yang baru saja dibuat
CMD ["npm", "start"]