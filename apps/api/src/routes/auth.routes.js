import { Router } from 'express';
import mongoose from 'mongoose';
import { BUSINESS_TYPES, USER_ROLES } from '@vitalblaze/shared';
import { issueAccessToken } from '../middleware/auth.js';

function buildDefaultTenantId() {
  return new mongoose.Types.ObjectId().toString();
}

function resolveSupportedBusinessType(value) {
  return Object.values(BUSINESS_TYPES).includes(value) ? value : BUSINESS_TYPES.BAKALA;
}

export function createAuthRouter({ jwtSecret }) {
  const router = Router();

  router.get('/roles', (_req, res) => {
    res.json({ roles: Object.values(USER_ROLES) });
  });

  router.post('/demo-login', (req, res) => {
    const defaultTenantId = process.env.SUPER_ADMIN_TENANT_ID || buildDefaultTenantId();

    const {
      email = process.env.SUPER_ADMIN_EMAIL || 'admin@buysialerp.sa',
      role = USER_ROLES.SUPER_ADMIN,
      tenantId = defaultTenantId,
      businessType = resolveSupportedBusinessType(process.env.SUPER_ADMIN_BUSINESS_TYPE),
      name = process.env.SUPER_ADMIN_NAME || 'Buysial ERP Admin',
    } = req.body || {};

    if (!Object.values(USER_ROLES).includes(role)) {
      return res.status(400).json({ message: 'Unsupported role supplied for demo login.' });
    }

    if (!Object.values(BUSINESS_TYPES).includes(businessType)) {
      return res.status(400).json({ message: 'Unsupported business type supplied for demo login.' });
    }

    const token = issueAccessToken(
      {
        sub: email,
        email,
        name,
        role,
        tenantId,
        businessType,
      },
      jwtSecret
    );

    return res.json({
      token,
      user: {
        email,
        name,
        role,
        tenantId,
        businessType,
      },
    });
  });

  return router;
}
