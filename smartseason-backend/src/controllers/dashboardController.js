const { PrismaClient } = require('@prisma/client');
const { computeStatus } = require('../utils/statusHelper');
const prisma = new PrismaClient();

const adminDashboard = async (req, res) => {
  try {
    const fields = await prisma.field.findMany({
      include: { 
        agent: { select: { id: true, name: true } }, 
        updates: { 
          include: { agent: { select: { name: true } } },
          orderBy: { createdAt: 'asc' } 
        } 
      }
    });

    const withStatus = fields.map(f => ({ ...f, status: computeStatus(f) }));

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const updatesToday = await prisma.fieldUpdate.findMany({
      where: { createdAt: { gte: startOfToday } }
    });

    const cropMap = {};
    fields.forEach(f => {
      cropMap[f.cropType] = (cropMap[f.cropType] || 0) + 1;
    });

    const summary = {
      total: fields.length,
      active: withStatus.filter(f => f.status === 'Active').length,
      atRisk: withStatus.filter(f => f.status === 'At Risk').length,
      completed: withStatus.filter(f => f.status === 'Completed').length,
      updatesToday: updatesToday.length,
      topCrop: Object.entries(cropMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
    };

    const recentActivity = await prisma.fieldUpdate.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { agent: { select: { name: true } }, field: { select: { name: true } } }
    });

    res.json({ summary, fields: withStatus, recentActivity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const agentDashboard = async (req, res) => {
  try {
    const fields = await prisma.field.findMany({
      where: { agentId: req.user.id },
      include: { 
        updates: { 
          include: { agent: { select: { name: true } } },
          orderBy: { createdAt: 'asc' } 
        } 
      }
    });

    const withStatus = fields.map(f => ({ ...f, status: computeStatus(f) }));

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const updatesToday = await prisma.fieldUpdate.findMany({
      where: { 
        agentId: req.user.id,
        createdAt: { gte: startOfToday } 
      }
    });

    const summary = {
      total: fields.length,
      active: withStatus.filter(f => f.status === 'Active').length,
      atRisk: withStatus.filter(f => f.status === 'At Risk').length,
      completed: withStatus.filter(f => f.status === 'Completed').length,
      updatesToday: updatesToday.length
    };

    res.json({ summary, fields: withStatus });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { adminDashboard, agentDashboard };
