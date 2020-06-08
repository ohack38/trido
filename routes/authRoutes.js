const passport = require('passport');

module.exports = (app) => {

    app.get('/failed', (req, res) => res.send('You failed to login!'))
    app.get('/dashboard', (req, res) => res.send(`Welcome to trido ${req.user.displayName}`))

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get(
        '/auth/google/callback', 
            passport.authenticate('google'),
            (req, res) => {
                // Successful authentication, redirect home.
                res.redirect('/dashboard');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}