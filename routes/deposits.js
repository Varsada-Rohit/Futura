const router = require('express').Router();
const Deposit = require('../models/Deposit');
const User = require('../models/User');

// @desc      Get all own deposits
// @route     GET /api/deposits
// @access    Private
router.get('/:id', async (req, res, next) => {
    const deposits = await Deposit.find({ depositedBy: req.params.id });
    console.log('deposits', deposits);
    res.status(200).json(deposits);
});

// @desc      Add deposit
// @route     POST /api/deposits/add
// @access    Private
router.post('/add', async (req, res, next) => {
    const { location, email, deposited, credit } = req.body;
    try {
        console.log('userUpdated');

        const user = await User.findOneAndUpdate(
            {
                email: email,
            },

            {
                $inc: {
                    totalRecycled: deposited,
                    balance: credit,
                    totalEarned: credit,
                },
            }
        );
        const addDeposit = await Deposit.create({
            location,
            kgDeposited: deposited,
            credit,
            depositedBy: user,
        });

        console.log('user', user);
        console.log('addDeposit', addDeposit);
        res.status(200).json({ message: 'Deposit successfully added' });
    } catch (err) {
        return res.status(400).json({ message: 'User doesn't exist' });
    }
});

// @desc      Transfer Cash
// @route     POST /api/deposits/transfer
// @access    Private
router.post('/transfer', async (req, res, next) => {
    const { id, transferAmount } = req.body;
    console.log('transferAmount', transferAmount);
    try {
        const transfer = await User.findByIdAndUpdate(id, {
            $inc: {
                balance: -transferAmount,
            },
        });
        res.status(200).json({
            message: 'Congratulation! Your cash is on its way',
        });
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Ooops... something went wrong!' });
    }
});

module.exports = router;
