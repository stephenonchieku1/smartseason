const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFields = async (req, res) => {
  try {
    const fields = await prisma.field.findMany({ 
      include: { 
        agent: { select: { name: true } }, 
        updates: { 
          include: { agent: { select: { name: true } } },
          orderBy: { createdAt: 'asc' }
        } 
      } 
    });
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getFieldById = async (req, res) => {
  try {
    const field = await prisma.field.findUnique({
      where: { id: req.params.id },
      include: { agent: { select: { name: true } }, updates: { orderBy: { createdAt: 'desc' }, include: { agent: { select: { name: true } } } } }
    });
    if (!field) return res.status(404).json({ message: 'Field not found' });
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createField = async (req, res) => {
  const { name, cropType, plantingDate, currentStage, agentId } = req.body;
  try {
    const field = await prisma.field.create({
      data: { 
        name, 
        cropType, 
        plantingDate: new Date(plantingDate), 
        currentStage: currentStage || 'PLANTED', 
        agentId 
      }
    });

    // Create initial history entry
    await prisma.fieldUpdate.create({
      data: {
        fieldId: field.id,
        agentId: req.user.id, // The admin who created it
        stage: currentStage || 'PLANTED',
        notes: 'Field initialized in system.'
      }
    });

    res.status(201).json(field);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateField = async (req, res) => {
  const { name, cropType, plantingDate, currentStage, agentId } = req.body;
  try {
    const field = await prisma.field.update({
      where: { id: req.params.id },
      data: { name, cropType, plantingDate: plantingDate ? new Date(plantingDate) : undefined, currentStage, agentId }
    });
    res.json(field);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteField = async (req, res) => {
  try {
    await prisma.fieldUpdate.deleteMany({ where: { fieldId: req.params.id } });
    await prisma.field.delete({ where: { id: req.params.id } });
    res.json({ message: 'Field deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssignedFields = async (req, res) => {
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
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFields, getFieldById, createField, updateField, deleteField, getAssignedFields };
