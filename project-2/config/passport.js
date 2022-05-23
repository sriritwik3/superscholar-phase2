import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const opts = {};
import UserModel from '../models/userSchema.js';
import passport from 'passport';

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
        UserModel.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);