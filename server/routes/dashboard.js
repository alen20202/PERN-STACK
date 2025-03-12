const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id] 
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user_name: user.rows[0].user_name });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
