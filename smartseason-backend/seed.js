const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.fieldUpdate.deleteMany();
  await prisma.field.deleteMany();
  await prisma.user.deleteMany();

  const adminPass = await bcrypt.hash('admin123', 10);
  const agentPass = await bcrypt.hash('agent123', 10);

  const admin = await prisma.user.create({
    data: { name: 'Admin User', email: 'admin@smartseason.com', password: adminPass, role: 'admin' }
  });

  const john = await prisma.user.create({
    data: { name: 'John Kamau', email: 'john@smartseason.com', password: agentPass, role: 'agent' }
  });

  const mary = await prisma.user.create({
    data: { name: 'Mary Wanjiku', email: 'mary@smartseason.com', password: agentPass, role: 'agent' }
  });

  const fieldsData = [
    { name: 'Kilimani A', cropType: 'Maize', plantingDate: new Date('2026-01-10'), currentStage: 'GROWING', agentId: john.id },
    { name: 'Ngong B', cropType: 'Wheat', plantingDate: new Date('2026-01-20'), currentStage: 'PLANTED', agentId: mary.id },
    { name: 'Ruiru C', cropType: 'Beans', plantingDate: new Date('2025-12-05'), currentStage: 'READY', agentId: john.id },
    { name: 'Thika D', cropType: 'Sorghum', plantingDate: new Date('2025-11-01'), currentStage: 'HARVESTED', agentId: john.id },
  ];

  for (const f of fieldsData) {
    const field = await prisma.field.create({ data: f });
    
    // Create initial update for every field
    await prisma.fieldUpdate.create({
      data: {
        fieldId: field.id,
        agentId: admin.id,
        stage: 'PLANTED',
        notes: 'Initial planting phase started.',
        createdAt: f.plantingDate
      }
    });

    // If it's further along than PLANTED, add a "Growing" update
    if (f.currentStage !== 'PLANTED') {
      await prisma.fieldUpdate.create({
        data: {
          fieldId: field.id,
          agentId: f.agentId,
          stage: 'GROWING',
          notes: 'Crop is showing steady progress.',
          createdAt: new Date(f.plantingDate.getTime() + 15 * 24 * 60 * 60 * 1000)
        }
      });
    }

    // If it's READY or HARVESTED, add a "Ready" update
    if (f.currentStage === 'READY' || f.currentStage === 'HARVESTED') {
      await prisma.fieldUpdate.create({
        data: {
          fieldId: field.id,
          agentId: f.agentId,
          stage: 'READY',
          notes: 'Samples show crop is ready for collection.',
          createdAt: new Date(f.plantingDate.getTime() + 60 * 24 * 60 * 60 * 1000)
        }
      });
    }

    // If it's HARVESTED, add the final update
    if (f.currentStage === 'HARVESTED') {
      await prisma.fieldUpdate.create({
        data: {
          fieldId: field.id,
          agentId: f.agentId,
          stage: 'HARVESTED',
          notes: 'Harvesting completed successfully.',
          createdAt: new Date()
        }
      });
    }
  }

  console.log('Seed complete with full history logs');
}

main().catch(console.error).finally(() => prisma.$disconnect());
