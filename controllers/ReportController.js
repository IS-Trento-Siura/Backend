import User from '../models/UserModel.js';
import Report from '../models/ReportModel.js';

export const createReport = async (req, res) => {
  try {
    const { userId, reportData } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReport = new Report({ userId, ...reportData });
    await newReport.save();

    return res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await Report.findByIdAndDelete(reportId);

    return res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};