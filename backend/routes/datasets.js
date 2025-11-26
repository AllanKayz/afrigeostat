const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/datasetController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/datasets
// @desc    Get all datasets with filtering
// @access  Public
router.get('/', datasetController.getDatasets);

// @route   POST /api/datasets/upload
// @desc    Upload a new dataset
// @access  Private
router.post('/upload', protect, datasetController.uploadDataset);

// @route   GET /api/datasets/:id/download
// @desc    Download a dataset
// @access  Public
router.get('/:id/download', datasetController.downloadDataset);

module.exports = router;
