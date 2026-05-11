const express = require("express");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");
const cors = require("cors");

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.use(express.json());

app.get("/ping", (req, res) => res.send("Server Catatan berjalan!"));

require("./schema/Catatan");
app.use("/api/v1/catatan", catatanRoutes);

const port = process.env.PORT || 8080;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
});