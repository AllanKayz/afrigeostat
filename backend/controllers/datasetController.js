const { Dataset } = require('../models');
const multer = require('multer');
const { Sequelize } = require('sequelize');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// @desc    Get all datasets with filtering
// @route   GET /api/datasets
// @access  Public
exports.getDatasets = async (req, res, next) => {
  const { category, license, format, bbox } = req.query;
  const where = {};

  if (category) {
    where.category = category;
  }
  if (license) {
    where.licenseType = license;
  }
  if (format) {
    where.format = format;
  }
  if (bbox) {
    const [minx, miny, maxx, maxy] = bbox.split(',').map(parseFloat);
    where.spatialExtent = Sequelize.fn(
      'ST_Intersects',
      Sequelize.col('spatialExtent'),
      Sequelize.fn('ST_MakeEnvelope', minx, miny, maxx, maxy, 4326)
    );
  }

  try {
    const datasets = await Dataset.findAll({ where });
    res.status(200).json({ success: true, data: datasets });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Upload a new dataset
// @route   POST /api/datasets/upload
// @access  Private
exports.uploadDataset = [
  upload.single('file'),
  async (req, res, next) => {
    // TODO: Implement file validation and processing (e.g., using GDAL/OGR)
    const { title, description, metadata, licenseType, versionNumber } = req.body;

    try {
      let parsedMetadata;
      try {
        parsedMetadata = JSON.parse(metadata);
      } catch (error) {
        return res.status(400).json({ success: false, error: 'Invalid metadata JSON' });
      }
      const dataset = await Dataset.create({
        title,
        description,
        metadata: parsedMetadata,
        licenseType,
        versionNumber,
        uploaderId: req.user.id,
        // TODO: Extract spatial extent from the uploaded file
      });

      res.status(201).json({ success: true, data: dataset });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },
];

// @desc    Download a dataset
// @route   GET /api/datasets/:id/download
// @access  Public
exports.downloadDataset = async (req, res, next) => {
  // TODO: Implement secure file download and logging
  res.status(200).json({ success: true, message: 'Download functionality not yet implemented' });
};
