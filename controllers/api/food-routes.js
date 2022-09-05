const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Food, Post, User, Potluck } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Food.findAll(req.body, {
        attributes: [
            'id',
            'potluck_id',
            'name',
            'created_at',
            'user_id',
            'description'
            [sequelize.literal('(SELECT COUNT(*) FROM food WHERE food.id = food.potluck_id)')]
        ],
        include: [
            {
                model: Potluck,
                attributes: ['id', 'name', 'description', 'startDate'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbFoodData => res.json(dbFoodData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Food.findOne(req.body, {
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'potluck_id',
            'name',
            'created_at',
            'user_id',
            'description'
            //[sequelize.literal('(SELECT COUNT(*) FROM food WHERE food.id = food.potluck_id)')]
        ],
        include: [
            {
                model: Potluck,
                attributes: ['id', 'name', 'description', 'startDate'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbFoodData => {
            if (!dbFoodData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbFoodData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // expects {name: 'Fried chicken!', type_id: 'main course dish', user_id: 1}
    if (req.session) {
        Food.create(req.body, {
            name: req.body.name,
            description: req.body.description,
            potluck_id: req.body.potluck_id,
            user_id: req.body.user_id
            //foodtype: '1',
            //user_id: req.session.user_id
        })
            .then(dbFoodData => res.json(dbFoodData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// router.put('/upvote', (req, res) => {
//   // custom static method created in models/Post.js
//   if (req.session) {
//     Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
//       .then(updatedVoteData => res.json(updatedVoteData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   }
// });

router.put('/:id', (req, res) => {
    Food.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbFoodData => {
            if (!dbFoodData) {
                res.status(404).json({ message: 'No food found with this id' });
                return;
            }
            res.json(dbFoodData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Food.destroy(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbFoodData => {
            if (!dbFoodData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbFoodData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
