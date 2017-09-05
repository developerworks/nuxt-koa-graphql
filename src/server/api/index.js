import Router from 'koa-router';
import users from './users';
import account from './account';

const router = Router();

router.use('/api', users.routes(), users.allowedMethods());
router.use('/api', account.routes(), account.allowedMethods());


export default router;