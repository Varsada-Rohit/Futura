const router = require('express').Router();
const DropOff = require('../models/DropOff');

/// @desc     Get all drop-offs
// @route     GET /api/dropoffs
// @access    Private
router.get('/', async (req, res, next) => {
    const dropOffs = await DropOff.find().populate('createdBy');
    console.log('dropOffs', dropOffs);
    res.status(200).json(dropOffs);
});

/// @desc     Add drop-offs
// @route     POST /api/dropoffs/add
// @access    Private
router.post('/add', async (req, res, next) => {
    const {
        name,
        street,
        houseNumber,
        city,
        zipCode,
        lngLat,
        createdBy,
    } = req.body;
    console.log('req.body', req.body);
    try {
        const addDropOff = DropOff.create({
            name,
            street,
            city,
            houseNumber,
            zipCode,
            lngLat,
            createdBy,
        });
        res.status(201).json({ message: 'Drop-off successfully added' });
    } catch (err) {
        res.status(400).json({ message: 'Error in adding drop-off' }, err);

        next(err);
    }
});

module.exports = router;
