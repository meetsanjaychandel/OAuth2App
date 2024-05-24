import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser"

import authRoutes from "../routes/auth.routes.js";
import profileRoutes from "../routes/user.routes.js";

// const authRoutes = require('./routes/auth');
// const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors({origin:process.env.CORS_ORIGIN,
    credentials:true
    }))
 

// Middleware
   
app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));

// Express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

// Passport Config
import pass from ('./config/passport.js');

pass(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

export default app;