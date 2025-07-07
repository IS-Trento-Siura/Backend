import User from '../models/UserModel.js';
import Report from '../models/ReportModel.js';
import Org from '../models/OrgModel.js';


export const createReport = async (req, res) => {
  try {
    const { reportData } = req.body;
    const { _id: userId, role } = req.user;

    const newReport = new Report({ user: userId, ...reportData });
    await newReport.save();

    const Model = role === 'org' ? Org : User;

    const updated = await Model.findByIdAndUpdate(
      userId,
      { $push: { segnalazioni: newReport._id } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: `${role} not found` });
    }

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

export const getReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json(report);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};  

export const getAllReports = async (req, res) => {
    try {   
      const reports = await Report.find();
      if (!reports) {
        return res.status(404).json({ message: 'No reports found' });
      }
  
      return res.status(200).json(reports);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
};

export const updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { reportData } = req.body;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    Object.assign(report, reportData);
    await report.save();

    return res.status(200).json({ message: 'Report updated successfully', report });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({ user: userId });
    if (!reports) {
      return res.status(404).json({ message: 'No reports found for this user' });
    }

    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};