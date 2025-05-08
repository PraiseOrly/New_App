export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // For simplicity, simulate processing delay and return mock result
    const { images, leadType, voltage, speed, reason, otherReason } = req.body;

    // Validate required fields
    if (!images || !Array.isArray(images) || images.length === 0) {
      res.status(400).json({ error: 'No ECG images provided' });
      return;
    }
    if (!leadType || !voltage || !speed || !reason) {
      res.status(400).json({ error: 'Missing required ECG metadata' });
      return;
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return mock analysis result
    res.status(200).json({
      message: 'ECG analysis completed successfully',
      analysisId: 'mock-analysis-123',
      summary: {
        imagesCount: images.length,
        leadType,
        voltage,
        speed,
        reason: reason === 'other' ? otherReason : reason,
        findings: 'No significant abnormalities detected',
        confidence: '98.7%',
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
