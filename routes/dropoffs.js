const router = require('express').Router();
const DropOff = require('../models/DropOff');

/// @desc     Get all drop-offs
// @route     GET /api/dropoffs
// @access    Private
router.get('/', async (req, res, next) => {
   const dropOffs = await DropOff.find().populate('createdBy');
   // console.log('dropOffs', dropOffs);
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
      openingTime,
      closingTime,
      createdBy,
   } = req.body;
   console.log('req.body', req.body);

   const found = await DropOff.findOne({ name });
   console.log('found', found);
   if (found) {
      return res.status(200).json({ message: 'E-point already exist' });
   } else {
      try {
         const addDropOff = DropOff.create({
            name,
            street,
            city,
            houseNumber,
            zipCode,
            lngLat,
            openingTime,
            closingTime,
            createdBy,
         });
         return res.status(201).json({ message: 'E-point successfully added' });
      } catch (err) {
         return res.status(400).json({ message: 'Error in adding e-point' });
      }
   }
});

module.exports = router;
