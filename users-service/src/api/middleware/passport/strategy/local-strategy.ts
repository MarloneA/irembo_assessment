// @ts-nocheck
import passport, { DoneCallback } from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "../../../../lib/utils";
import UserService from "../../../services";


const service = new UserService();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await service.findUserByUniqueId(id);

    if (!user) {
      return done(null, false, { message: "user not found" });
    }
    done(null, { id: user?.id, role: user?.role });
  } catch (error) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (request, email, password, done) => {
      try {
        const user = await service.findUserByUniqueEmail(email);

        if (!user) {
          request.res.status(400).send({
            message: "user not found",
          });
          done(null, false);
        }

        if (!comparePassword(password, user.password)) {
          request.res.status(400).send({ message: "invalid credentials" });
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
