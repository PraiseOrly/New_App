import { NextApiRequest, NextApiResponse } from 'next';

// JavaScript implementation of ASCVD 10-year risk calculator based on Pooled Cohort Equations
// This is a simplified version and may not cover all race/gender combinations or all variables.
// For production use, consider a validated library or service.

function ascvd10yrRisk({
  gender,
  age,
  race,
  total_chol,
  hdl_chol,
  sbp,
  on_hypertension_treatment,
  has_diabetes,
  is_smoker,
}: {
  gender: string;
  age: number;
  race: string;
  total_chol: number;
  hdl_chol: number;
  sbp: number;
  on_hypertension_treatment: boolean;
  has_diabetes: boolean;
  is_smoker: boolean;
}): number {
  // Coefficients for white males (example)
  // Source: 2013 ACC/AHA Pooled Cohort Equations
  // This example only implements white males for demonstration.
  if (gender !== 'male' || race !== 'white') {
    // For simplicity, return a placeholder or throw error for unsupported groups
    throw new Error('Only white male risk calculation is implemented in this example.');
  }

  // Log transformed variables
  const lnAge = Math.log(age);
  const lnTotalChol = Math.log(total_chol);
  const lnHdl = Math.log(hdl_chol);
  const lnSbp = Math.log(sbp);

  // Coefficients for white males
  const coef = {
    lnAge: 12.344,
    lnTotalChol: 11.853,
    lnHdl: -7.990,
    lnSbpTreated: 1.797,
    lnSbpUntreated: 1.764,
    smoker: 7.837,
    diabetes: 0.658,
  };

  // Baseline survival at 10 years for white males
  const baselineSurvival = 0.9144;

  // Mean coefficient sum for white males
  const meanCoefSum = 61.18;

  // Calculate risk score
  let riskScore =
    coef.lnAge * lnAge +
    coef.lnTotalChol * lnTotalChol +
    coef.lnHdl * lnHdl +
    (on_hypertension_treatment ? coef.lnSbpTreated : coef.lnSbpUntreated) * lnSbp +
    coef.smoker * (is_smoker ? 1 : 0) +
    coef.diabetes * (has_diabetes ? 1 : 0);

  // Calculate 10-year risk
  const risk = 1 - Math.pow(baselineSurvival, Math.exp(riskScore - meanCoefSum));

  // Return risk as percentage (0-100)
  return Math.round(risk * 1000) / 10; // one decimal place
}

function getRiskLevelAndRecommendations(risk: number) {
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const {
      age,
      gender,
      race = 'white',
      cholesterol: total_chol,
      hdl,
      bp: sbp,
      diabetes: has_diabetes,
      smoker: is_smoker,
      onHypertensionTreatment = false,
    } = req.body;

    if (
      typeof age !== 'number' ||
      typeof gender !== 'string' ||
      typeof total_chol !== 'number' ||
      typeof hdl !== 'number' ||
      typeof sbp !== 'number' ||
      typeof has_diabetes !== 'boolean' ||
      typeof is_smoker !== 'boolean' ||
      typeof onHypertensionTreatment !== 'boolean'
    ) {
      res.status(400).json({ error: 'Invalid or missing input data' });
      return;
    }

    const riskScore = ascvd10yrRisk({
      gender,
      age,
      race,
      total_chol,
      hdl_chol: hdl,
      sbp,
      on_hypertension_treatment: onHypertensionTreatment,
      has_diabetes,
      is_smoker,
    });

    const { level, recommendations } = getRiskLevelAndRecommendations(riskScore);

    res.status(200).json({ riskScore, riskLevel: level, recommendations });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
