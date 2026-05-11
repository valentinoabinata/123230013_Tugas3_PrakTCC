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

  const inputStyle = {
    width: "100%",
    padding: "0.65rem 0.85rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    marginBottom: "0.75rem",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    color: "#4a5568",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#edf2f7", padding: "2rem 1rem", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <h1 style={{ textAlign: "center", fontSize: "1.9rem", fontWeight: 700, color: "#2d3748", marginBottom: "1.8rem", letterSpacing: "-0.3px" }}>
          📝 Aplikasi Catatan
        </h1>

        {/* Notification */}
        {msg.text && (
          <div style={{
            padding: "0.85rem 1rem", marginBottom: "1rem", borderRadius: 8,
            background: msg.type === "success" ? "#c6f6d5" : "#fed7d7",
            color: msg.type === "success" ? "#276749" : "#9b2c2c",
            fontSize: "0.92rem", fontWeight: 500,
          }}>
            {msg.text}
          </div>
        )}

        {/* Form Card */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#2d3748", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "#4299e1", fontSize: "1.1rem" }}>{editId ? "✏️" : "➕"}</span>
            {editId ? "Edit Catatan" : "Tambah Catatan Baru"}
          </h2>

          <input
            value={judul}
            onChange={e => setJudul(e.target.value)}
            placeholder="Judul catatan..."
            style={inputStyle}
          />
          <textarea
            value={isi}
            onChange={e => setIsi(e.target.value)}
            placeholder="Isi catatan..."
            style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
          />

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button
              onClick={submitForm}
              style={{
                padding: "0.55rem 1.4rem", background: "#4299e1", color: "#fff",
                border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
                fontSize: "0.92rem", transition: "background 0.2s",
              }}
              onMouseEnter={e => e.target.style.background = "#3182ce"}
              onMouseLeave={e => e.target.style.background = "#4299e1"}
            >
              Simpan
            </button>
            {editId && (
              <button
                onClick={resetForm}
                style={{
                  padding: "0.55rem 1.4rem", background: "#a0aec0", color: "#fff",
                  border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
                  fontSize: "0.92rem",
                }}
              >
                Batal
              </button>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          {catatanList.length === 0 ? (
            <p style={{ textAlign: "center", color: "#a0aec0", padding: "2rem 0" }}>
              Belum ada catatan. Tambahkan sekarang!
            </p>
          ) : catatanList.map(c => (
            <div
              key={c.id}
              style={{
                background: "#fff", borderRadius: 14, padding: "1.2rem 1.4rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ margin: "0 0 0.3rem", fontSize: "1.05rem", fontWeight: 700, color: "#2d3748" }}>
                {c.judul}
              </h3>
              <p style={{ color: "#718096", fontSize: "0.92rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>
                {c.isi}
              </p>
              <div style={{ fontSize: "0.78rem", color: "#a0aec0", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                🕒 {new Date(c.tanggal_dibuat).toLocaleString("id-ID")}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => editCatatan(c.id)}
                  style={{
                    padding: "0.5rem 1.1rem", background: "#ed8936", color: "#fff",
                    border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
                    fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.3rem",
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteCatatan(c.id)}
                  style={{
                    padding: "0.5rem 1.1rem", background: "#e53e3e", color: "#fff",
                    border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
                    fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.3rem",
                  }}
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}