const express = require("express");
const router = express.Router();

/**
 * Get Route for /api/profiles/test
 * @desc Test Profile route
 * @access Public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: "Profile Works"
  });
})

module.exports = router;