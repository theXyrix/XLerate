import axios from 'axios';
import { initialPatientData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const uploadMedicalDocument = async (file, onUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append('document', file);

    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onUploadProgress) onUploadProgress(percentCompleted);
      },
    });
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, returning mock upload response:', error.message);
    // Return realistic mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          documentId: `doc-${Date.now()}`,
          filename: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date().toISOString(),
          status: 'Uploaded'
        });
      }, 600);
    });
  }
};

export const analyzeDocument = async (documentId) => {
  try {
    const response = await apiClient.post(`/documents/${documentId}/analyze`);
    return response.data;
  } catch (error) {
    console.warn('Backend unavailable, returning mock AI analysis:', error.message);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          documentId,
          extractedInformation: initialPatientData.medicalRecords[0]
        });
      }, 800);
    });
  }
};

export const getHealthProfile = async () => {
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    return Promise.resolve(initialPatientData.patientInfo);
  }
};

export const getHealthTimeline = async () => {
  try {
    const response = await apiClient.get('/timeline');
    return response.data;
  } catch (error) {
    return Promise.resolve(initialPatientData.medicalRecords);
  }
};

export const getHealthTrends = async (metric = 'Hemoglobin') => {
  try {
    const response = await apiClient.get(`/trends?metric=${metric}`);
    return response.data;
  } catch (error) {
    return Promise.resolve(initialPatientData.trendSeries[metric] || []);
  }
};

export const compareReports = async (previousDocId, latestDocId) => {
  try {
    const response = await apiClient.post('/documents/compare', {
      previousDocId,
      latestDocId
    });
    return response.data;
  } catch (error) {
    return Promise.resolve({
      previous: initialPatientData.medicalRecords.find(r => r.id === previousDocId) || initialPatientData.medicalRecords[2],
      latest: initialPatientData.medicalRecords.find(r => r.id === latestDocId) || initialPatientData.medicalRecords[0],
      changes: [
        { parameter: 'Hemoglobin', prev: '12.8 g/dL', latest: '10.2 g/dL', direction: 'decreased', alert: true },
        { parameter: 'Vitamin D', prev: '22 ng/mL', latest: '14 ng/mL', direction: 'decreased', alert: true },
        { parameter: 'Fasting Glucose', prev: '108 mg/dL', latest: '126 mg/dL', direction: 'increased', alert: false },
        { parameter: 'Medication', note: 'Metformin 500 mg appears in both records.' }
      ]
    });
  }
};

export const generateDoctorVisitSummary = async () => {
  try {
    const response = await apiClient.get('/doctor-visit/summary');
    return response.data;
  } catch (error) {
    return Promise.resolve(initialPatientData.doctorVisitSummary);
  }
};

export const askHealthCopilot = async (question) => {
  try {
    const response = await apiClient.post('/copilot/ask', { question });
    return response.data;
  } catch (error) {
    return Promise.resolve({
      answer: "Based on your uploaded records, your hemoglobin value is 10.2 g/dL which is below the reference range.",
      sources: ["Blood_Report_Oct_2026.pdf"]
    });
  }
};

export default {
  uploadMedicalDocument,
  analyzeDocument,
  getHealthProfile,
  getHealthTimeline,
  getHealthTrends,
  compareReports,
  generateDoctorVisitSummary,
  askHealthCopilot
};
