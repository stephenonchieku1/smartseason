const computeStatus = (field) => {
  if (field.currentStage === 'HARVESTED') return 'Completed';

  const lastUpdate = field.updates?.[0]?.createdAt;
  if (!lastUpdate) return 'At Risk';

  const daysSinceUpdate = (Date.now() - new Date(lastUpdate)) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 7 ? 'At Risk' : 'Active';
};

module.exports = { computeStatus };
