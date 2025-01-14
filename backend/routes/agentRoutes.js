const express = require("express");
const agentController = require("../controllers/agentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create', authMiddleware.authenticate, agentController.createAgent);
router.get('/all', authMiddleware.authenticate, agentController.getAllAgents);
router.get('/:id', authMiddleware.authenticate, agentController.getAgent);

module.exports = router;