# 📝 Aplikasi Catatan - Tugas 3 Praktikum TCC

Aplikasi manajemen catatan sederhana yang dibangun dengan arsitektur modern menggunakan layanan **Platform as a Service (PaaS)** di Google Cloud Platform. Proyek ini memisahkan antara layanan Frontend dan Backend untuk efisiensi dan skalabilitas.

## 🚀 Teknologi & Deployment
- **Frontend:** React.js + Vite (Dideploy ke **Google App Engine**)
- **Backend:** Node.js + Express.js (Dideploy ke **Google Cloud Run**)
- **Database:** MySQL (phpMyAdmin)
- **Automation:** Google Cloud Build (CI/CD Triggers)

## 📂 Struktur Branch
Repositori ini menggunakan sistem branching untuk memisahkan fungsionalitas:
- `main`: Dokumentasi dan ringkasan proyek.
- `frontend`: Kode sumber antarmuka pengguna dan konfigurasi App Engine.
- `backend`: Kode sumber API dan konfigurasi Docker untuk Cloud Run.

## 🔗 Link Akses
- **Frontend URL:** https://e-44-488914.uc.r.appspot.com
- **Backend URL:** https://valent-deploy-backend-73763759634.us-central1.run.app/api/v1/catatan
