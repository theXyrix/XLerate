import React, { createContext, useContext, useState } from 'react';
import { initialPatientData } from '../data/mockData';

const HealthDataContext = createContext();

export const HealthDataProvider = ({ children }) => {
  const [data, setData] = useState(initialPatientData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processingState, setProcessingState] = useState({
    isProcessing: false,
    step: 1,
    completed: false
  });
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState('rec-005');

  // Load demo mode immediately
  const loadDemoData = () => {
    setData(initialPatientData);
    setUploadedFile(null);
    setProcessingState({ isProcessing: false, step: 5, completed: true });
    setSelectedRecordId('rec-005');
  };

  // Select active record
  const selectedRecord = data.medicalRecords.find(r => r.id === selectedRecordId) || data.medicalRecords[0];

  // Add a new chat message
  const sendMessageToCopilot = (text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let aiResponseText = "Based on your uploaded records, your October 2026 lab report indicates a hemoglobin level of 10.2 g/dL and Vitamin D of 14 ng/mL, both below reference ranges shown on your report.";
    let sources = ["Blood_Report_Oct_2026.pdf", "Prescription_Sep_2026.pdf"];

    const textLower = text.toLowerCase();
    if (textLower.includes("changed") || textLower.includes("change")) {
      aiResponseText = "Based on your uploaded records, your hemoglobin decreased from 12.8 g/dL (Jan 2026) to 11.4 g/dL (Jun 2026) and 10.2 g/dL (Oct 2026). Fasting glucose also increased from 108 mg/dL to 126 mg/dL.";
      sources = ["Blood_Report_Jan_2026.pdf", "Blood_Report_Jun_2026.pdf", "Blood_Report_Oct_2026.pdf"];
    } else if (textLower.includes("medication") || textLower.includes("medicine") || textLower.includes("drug")) {
      aiResponseText = "Your records list two active medications prescribed on Sep 20, 2026: Metformin 500 mg (twice daily) and Vitamin D3 60,000 IU (weekly).";
      sources = ["Prescription_Sep_2026.pdf"];
    } else if (textLower.includes("doctor") || textLower.includes("discuss") || textLower.includes("ask")) {
      aiResponseText = "Recommended questions for your doctor visit include: 1) What could explain the hemoglobin decrease? 2) Should Vitamin D supplementation be adjusted? 3) Should medication history be reviewed with recent glucose numbers?";
      sources = ["Blood_Report_Oct_2026.pdf", "Prescription_Sep_2026.pdf"];
    } else if (textLower.includes("trend") || textLower.includes("hemoglobin")) {
      aiResponseText = "Your records show a downward trend in Hemoglobin: 12.8 g/dL in January, 11.4 g/dL in June, and 10.2 g/dL in October 2026.";
      sources = ["Blood_Report_Jan_2026.pdf", "Blood_Report_Jun_2026.pdf", "Blood_Report_Oct_2026.pdf"];
    }

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources
    };

    setData(prev => ({
      ...prev,
      copilotChatHistory: [...prev.copilotChatHistory, userMsg, aiMsg]
    }));
  };

  return (
    <HealthDataContext.Provider
      value={{
        data,
        setData,
        uploadedFile,
        setUploadedFile,
        processingState,
        setProcessingState,
        activeEvidence,
        setActiveEvidence,
        searchQuery,
        setSearchQuery,
        selectedRecordId,
        setSelectedRecordId,
        selectedRecord,
        loadDemoData,
        sendMessageToCopilot
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => useContext(HealthDataContext);
