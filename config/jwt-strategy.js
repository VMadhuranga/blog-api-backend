const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const AuthorModel = require("../models/author-model");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_KEY;

module.exports = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const author = await AuthorModel.findOne({
      userName: jwtPayload.userName,
    }).exec();

    if (author) {
      return done(null, true);
    }

    return done(null, false);
  } catch (error) {
    return done(error);
  }
});
