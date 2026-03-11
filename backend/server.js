require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Parser } = require("json2csv");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("STACC Feedback API running");
});



app.post("/submit-feedback", async (req, res) => {

  const {
    objective_clear,
    informative,
    expectations,
    organized,
    time_mgmt,
    speaker,
    presentation,
    venue,
    audio_visual,
    rating,
    comments
  } = req.body;

  try {

    await pool.query(
      `INSERT INTO feedback(
        objective_clear,
        informative,
        expectations,
        organized,
        time_mgmt,
        speaker,
        presentation,
        venue,
        audio_visual,
        rating,
        comments
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        objective_clear,
        informative,
        expectations,
        organized,
        time_mgmt,
        speaker,
        presentation,
        venue,
        audio_visual,
        rating,
        comments
      ]
    );

    res.json({ message: "Feedback saved successfully" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Database error" });

  }

});


app.get("/export-feedback", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM feedback ORDER BY created_at DESC"
    );

    const fields = [
      "id",
      "objective_clear",
      "informative",
      "expectations",
      "organized",
      "time_mgmt",
      "speaker",
      "presentation",
      "venue",
      "audio_visual",
      "rating",
      "comments",
      "created_at"
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(result.rows);

    res.header("Content-Type", "text/csv");
    res.attachment("feedback_responses.csv");
    res.send(csv);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Error exporting feedback" });

  }

});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});