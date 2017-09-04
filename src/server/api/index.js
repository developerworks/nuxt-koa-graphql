import users from './users';
import Router from 'koa-router';

const router = Router();

router.use('/api', users.routes(), users.allowedMethods());


export default router;