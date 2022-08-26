const router = require('express').Router();

const userRoutes = require('./user-routes');
const potluckRoutes = require('./potluck-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/potluck', potluckRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
