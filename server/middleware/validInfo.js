module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // Function to validate email format
  function validEmail(userEmail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  }

  // Validate registration fields
  if (req.path === "/register") {
    if (!email || !name || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    } else if (!validEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
  }

  // Validate login fields
  else if (req.path === "/login") {
    if (!email || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    } else if (!validEmail(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
  }

  // Proceed to next middleware if validation passes
  next();
};
