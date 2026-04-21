const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addUpdate = async (req, res) => {
  const { stage, notes } = req.body;
  const fieldId = req.params.id;

  try {
    const field = await prisma.field.findUnique({ where: { id: fieldId } });
    if (!field) return res.status(404).json({ message: 'Field not found' });
    
    // Ensure agent is assigned to this field or is an admin
    if (req.user.role !== 'admin' && field.agentId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this field' });
    }

    const update = await prisma.fieldUpdate.create({
      data: { fieldId, agentId: req.user.id, stage, notes }
    });

    // Update the current stage on the field itself
    await prisma.field.update({
      where: { id: fieldId },
      data: { currentStage: stage }
    });

    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addUpdate };
