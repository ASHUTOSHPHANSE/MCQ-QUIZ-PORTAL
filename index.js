const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.use(express.urlencoded());

// app.use(cookieParser());
// for css and js static pages
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout', './admin/layout');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session( {
    name: 'examportal',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/exam_portal_db',
        autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('err', err)
        return;
    }
    console.log(`Express is running at port: ${port}`);
});

