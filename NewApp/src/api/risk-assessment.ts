function calculateRiskScore(data: any) {
  let risk = 0.03 * data.age + 0.02 * data.cholesterol - 0.05 * data.hdl + 0.01 * data.bp;
  if (data.gender === 'male') risk += 0.5;
  if (data.diabetes) risk += 2;
  if (data.smoker) risk += 3;
  risk = Math.min(Math.max(risk, 0), 100);
  return Math.round(risk * 10) / 10;
}

function getRiskLevelAndRecommendations(risk: any) {
  if (risk < 5) {
    return {
      level: 'Low',
      recommendations: [
        'Maintain healthy lifestyle',
        'Regular physical activity',
        'Balanced diet',
      ],
    };
  } else if (risk < 7.5) {
    return {
      level: 'Borderline',
      recommendations: [
        'Adopt heart-healthy diet',
        'Increase physical activity',
        'Monitor risk factors',
      ],
    };
  } else if (risk < 20) {
    return {
      level: 'Intermediate',
      recommendations: [
        'Consider statin therapy',
        'Encourage lifestyle changes',
        'Schedule follow-up',
      ],
    };
  } else {
    return {
      level: 'High',
      recommendations: [
        'Initiate statin therapy',
        'Strict lifestyle modifications',
        'Frequent monitoring',
      ],
    };
  }
}

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { age, gender, cholesterol, hdl, bp, diabetes, smoker } = req.body;

    if (
      typeof age !== 'number' ||
      typeof gender !== 'string' ||
      typeof cholesterol !== 'number' ||
      typeof hdl !== 'number' ||
      typeof bp !== 'number' ||
      typeof diabetes !== 'boolean' ||
      typeof smoker !== 'boolean'
    ) {
      res.status(400).json({ error: 'Invalid or missing input data' });
      return;
    }

    const riskScore = calculateRiskScore({ age, gender, cholesterol, hdl, bp, diabetes, smoker });
    const { level, recommendations } = getRiskLevelAndRecommendations(riskScore);

    res.status(200).json({ riskScore, riskLevel: level, recommendations });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
