const express = require("express");
const router = express.Router();

/**
 * Get Route for /api/users/test
 * @desc Test Users route
 * @access Public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: "Users Works"
  });
})

module.exports = router;