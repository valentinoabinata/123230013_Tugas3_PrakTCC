import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/catatan";

export default function App() {
  const [catatanList, setCatatanList] = useState([]);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => { loadCatatan(); }, []);

  const showMsg = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const loadCatatan = async () => {
    try {
      const res = await axios.get(API);
      setCatatanList(res.data.data || []);
    } catch (e) {
      showMsg("Gagal memuat catatan: " + e.message, "error");
    }
  };

  const submitForm = async () => {
    if (!judul || !isi) return showMsg("Judul dan isi tidak boleh kosong!", "error");
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, { judul, isi });
        showMsg("Catatan berhasil diperbarui!", "success");
      } else {
        await axios.post(API, { judul, isi });
        showMsg("Catatan berhasil ditambahkan!", "success");
      }
      resetForm();
      loadCatatan();
    } catch (e) {
      showMsg("Gagal menyimpan: " + e.message, "error");
    }
  };

  const editCatatan = async (id) => {
    const res = await axios.get(`${API}/${id}`);
    const c = res.data.data;
    setJudul(c.judul);
    setIsi(c.isi);
    setEditId(c.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCatatan = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    await axios.delete(`${API}/${id}`);
    showMsg("Catatan dihapus.", "success");
    loadCatatan();
  };

  const resetForm = () => { setJudul(""); setIsi(""); setEditId(null); };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>📝 Aplikasi Catatan</h1>

      {msg.text && (
        <div style={{ padding: "1rem", marginBottom: "1rem", borderRadius: 8,
          background: msg.type === "success" ? "#c6f6d5" : "#fed7d7",
          color: msg.type === "success" ? "#276749" : "#9b2c2c" }}>
          {msg.text}
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
        <h2>{editId ? "✏️ Edit Catatan" : "➕ Tambah Catatan Baru"}</h2>
        <input value={judul} onChange={e => setJudul(e.target.value)}
          placeholder="Judul catatan..."
          style={{ width: "100%", padding: "0.75rem", border: "1.5px solid #e2e8f0", borderRadius: 8, marginBottom: "0.75rem", fontSize: "0.95rem" }} />
        <textarea value={isi} onChange={e => setIsi(e.target.value)}
          placeholder="Isi catatan..."
          style={{ width: "100%", padding: "0.75rem", border: "1.5px solid #e2e8f0", borderRadius: 8, marginBottom: "0.75rem", minHeight: 100, fontSize: "0.95rem" }} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={submitForm} style={{ padding: "0.6rem 1.4rem", background: "#667eea", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
            Simpan
          </button>
          {editId && (
            <button onClick={resetForm} style={{ padding: "0.6rem 1.4rem", background: "#a0aec0", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
              Batal
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {catatanList.length === 0 ? (
          <p style={{ textAlign: "center", color: "#a0aec0" }}>Belum ada catatan. Tambahkan sekarang!</p>
        ) : catatanList.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 12, padding: "1.2rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: "4px solid #667eea" }}>
            <h3>{c.judul}</h3>
            <p style={{ color: "#718096", margin: "0.3rem 0 0.6rem" }}>{c.isi}</p>
            <div style={{ fontSize: "0.8rem", color: "#a0aec0", marginBottom: "0.75rem" }}>
              🕒 {new Date(c.tanggal_dibuat).toLocaleString("id-ID")}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => editCatatan(c.id)} style={{ padding: "0.6rem 1.4rem", background: "#ed8936", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>✏️ Edit</button>
              <button onClick={() => deleteCatatan(c.id)} style={{ padding: "0.6rem 1.4rem", background: "#e53e3e", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>🗑️ Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}