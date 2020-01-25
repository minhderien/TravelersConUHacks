module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // error message
        // redirect
        /**
         * To use this in another page:
         * const { ensureAuthenticated } = require('../config/auth');
         *  router.get('/test', ensureAuthenticated, (req, res) => {
         *      res.render('dashboard, {
         *          name: req.user.name
         *      });
         * });
         */
    }
}