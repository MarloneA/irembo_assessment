import { Router } from 'express';
import { bookSlot, cancelBooking, confirmBooking, overrideBooking } from './controllers';
import { checkRole } from './middleware/auth';
import { AUTH_ROLE_ADMIN, AUTH_ROLE_DRIVER, AUTH_ROLE_EMPLOYEE } from '../lib/constants';

const router = Router();

router.post('/book', bookSlot);
router.post('/confirm', checkRole(AUTH_ROLE_DRIVER), confirmBooking);
router.post('/cancel', checkRole(AUTH_ROLE_EMPLOYEE), cancelBooking);
router.post('/override', checkRole(AUTH_ROLE_ADMIN), overrideBooking);


export default router;