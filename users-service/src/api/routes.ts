import { Router } from 'express';
import { login, register } from './controllers';
import passport from './middleware/passport/strategy/local-strategy';

const router = Router();

router.post('/register', register);
router.post('/login', passport.authenticate("local", { failureMessage: true }), login);

export default router;