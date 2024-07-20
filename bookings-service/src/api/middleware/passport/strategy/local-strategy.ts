// @ts-nocheck
import passport, { DoneCallback } from "passport";
import { Strategy } from "passport-local";
import { prisma } from "../../../../lib/client";

async function findUserByUniqueId(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}


passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserByUniqueId(id);

    if (!user) {
      return done(null, false, { message: "user not found" });
    }
    done(null, { id: user?.id, role: user?.role });
  } catch (error) {
    done(error, null);
  }
});


export default passport;
