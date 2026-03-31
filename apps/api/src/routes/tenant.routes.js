import { Router } from 'express';
import { USER_ROLES } from '@vitalblaze/shared';
import { authenticateJwt, authorizeRoles, enforceTenantScope } from '../middleware/auth.js';

export function createTenantRouter({ jwtSecret }) {
  const router = Router();

  router.get(
    '/:tenantId/secure-profile',
    authenticateJwt({ secret: jwtSecret }),
    authorizeRoles(USER_ROLES.SUPER_ADMIN, USER_ROLES.STORE_ADMIN, USER_ROLES.MANAGER, USER_ROLES.CASHIER),
    enforceTenantScope({ source: 'params', key: 'tenantId' }),
    (req, res) => {
      res.json({
        message: 'Tenant scope validated successfully.',
        tenantId: req.params.tenantId,
        auth: req.auth,
      });
    }
  );

  return router;
}
