const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Catatan = sequelize.define("Catatan", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanggal_dibuat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "catatan",
  timestamps: false,
});

module.exports = Catatan;
