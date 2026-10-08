export const initialPatientData = {
  patientInfo: {
    name: "Raj",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    abhaId: "91-8273-4921-1029",
    fhirStatus: "Ready",
    abdmStatus: "Demo-ready",
    location: "Chennai, Tamil Nadu"
  },
  stats: {
    medicalRecordsCount: 8,
    labReportsCount: 5,
    medicationsCount: 3,
    attentionAreasCount: 2
  },
  aiOverview: {
    summary: "Your recent records show changes in a few health measurements. Two values are outside the reference ranges shown on your latest report.",
    attentionAreas: 2,
    normalValues: 5,
    trendsDetected: 2,
    detailedNotice: "Downward trend detected across available records for Hemoglobin and Vitamin D. Your glucose level has shown a slight upward trend across recent test dates."
  },
  medicalRecords: [
    {
      id: "rec-005",
      date: "Oct 08, 2026",
      rawDate: "2026-10-08",
      type: "Lab Report",
      category: "Lab Reports",
      documentName: "Blood Test — Complete Panel",
      fileName: "Blood_Report_Oct_2026.pdf",
      status: "Analyzed",
      fileSize: "2.4 MB",
      confidence: 97,
      labResults: [
        {
          param: "Hemoglobin",
          value: 10.2,
          unit: "g/dL",
          referenceRange: "12.0 – 16.0 g/dL",
          status: "Below Reference Range",
          flag: "critical",
          confidence: 97,
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 1,
          previousValue: 11.4
        },
        {
          param: "Vitamin D (25-OH)",
          value: 14,
          unit: "ng/mL",
          referenceRange: "30.0 – 100.0 ng/mL",
          status: "Below Reference Range",
          flag: "critical",
          confidence: 95,
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 1,
          previousValue: 22
        },
        {
          param: "Fasting Glucose",
          value: 126,
          unit: "mg/dL",
          referenceRange: "70.0 – 99.0 mg/dL",
          status: "Review Required",
          flag: "warning",
          confidence: 94,
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 2,
          previousValue: 114
        },
        {
          param: "Total Cholesterol",
          value: 178,
          unit: "mg/dL",
          referenceRange: "< 200.0 mg/dL",
          status: "Within Reference Range",
          flag: "normal",
          confidence: 98,
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 2,
          previousValue: 180
        },
        {
          param: "Platelet Count",
          value: 245000,
          unit: "/µL",
          referenceRange: "150,000 – 450,000 /µL",
          status: "Within Reference Range",
          flag: "normal",
          confidence: 99,
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 1,
          previousValue: 250000
        }
      ],
      simpleExplanation: "Your report shows a hemoglobin value below the reference range provided by the laboratory. Vitamin D is also below the reference range shown in this report. These results should be interpreted together with your medical history and symptoms.",
      evidenceList: [
        {
          insight: "Hemoglobin below reference range",
          supportingValue: "10.2 g/dL (Reference: 12–16 g/dL)",
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 1
        },
        {
          insight: "Vitamin D deficiency noted",
          supportingValue: "14 ng/mL (Reference: 30–100 ng/mL)",
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 1
        },
        {
          insight: "Fasting Glucose review indicated",
          supportingValue: "126 mg/dL (Reference: 70–99 mg/dL)",
          sourceDoc: "Blood_Report_Oct_2026.pdf",
          page: 2
        }
      ]
    },
    {
      id: "rec-004",
      date: "Sep 20, 2026",
      rawDate: "2026-10-20",
      type: "Prescription",
      category: "Prescriptions",
      documentName: "Internal Medicine Consultation",
      fileName: "Prescription_Sep_2026.pdf",
      status: "Analyzed",
      fileSize: "1.1 MB",
      confidence: 96,
      medications: [
        {
          name: "Metformin",
          dosage: "500 mg",
          frequency: "Twice daily with meals",
          status: "Active",
          source: "Prescription — September 20, 2026",
          confidence: 96,
          notes: "Continued for blood sugar management"
        },
        {
          name: "Vitamin D3",
          dosage: "60,000 IU",
          frequency: "Weekly for 8 weeks",
          status: "Active",
          source: "Prescription — September 20, 2026",
          confidence: 94,
          notes: "Prescribed for low Vitamin D levels"
        }
      ]
    },
    {
      id: "rec-003",
      date: "Jun 14, 2026",
      rawDate: "2026-06-14",
      type: "Lab Report",
      category: "Lab Reports",
      documentName: "Routine Mid-Year Blood Work",
      fileName: "Blood_Report_Jun_2026.pdf",
      status: "Analyzed",
      fileSize: "1.8 MB",
      confidence: 98,
      labResults: [
        {
          param: "Hemoglobin",
          value: 11.4,
          unit: "g/dL",
          referenceRange: "12.0 – 16.0 g/dL",
          status: "Below Reference Range",
          flag: "critical",
          confidence: 98,
          sourceDoc: "Blood_Report_Jun_2026.pdf",
          page: 1
        },
        {
          param: "Vitamin D (25-OH)",
          value: 22,
          unit: "ng/mL",
          referenceRange: "30.0 – 100.0 ng/mL",
          status: "Below Reference Range",
          flag: "critical",
          confidence: 96,
          sourceDoc: "Blood_Report_Jun_2026.pdf",
          page: 1
        },
        {
          param: "Fasting Glucose",
          value: 114,
          unit: "mg/dL",
          referenceRange: "70.0 – 99.0 mg/dL",
          status: "Review Required",
          flag: "warning",
          confidence: 95,
          sourceDoc: "Blood_Report_Jun_2026.pdf",
          page: 2
        }
      ]
    },
    {
      id: "rec-002",
      date: "Mar 20, 2026",
      rawDate: "2026-03-20",
      type: "Prescription",
      category: "Prescriptions",
      documentName: "Initial Consultation Prescription",
      fileName: "Prescription_Mar_2026.pdf",
      status: "Analyzed",
      fileSize: "950 KB",
      confidence: 95,
      medications: [
        {
          name: "Metformin",
          dosage: "500 mg",
          frequency: "Twice daily",
          status: "Active",
          source: "Prescription — March 20, 2026",
          confidence: 95
        }
      ]
    },
    {
      id: "rec-001",
      date: "Jan 12, 2026",
      rawDate: "2026-01-12",
      type: "Lab Report",
      category: "Lab Reports",
      documentName: "Annual Health Checkup Report",
      fileName: "Blood_Report_Jan_2026.pdf",
      status: "Analyzed",
      fileSize: "2.1 MB",
      confidence: 99,
      labResults: [
        {
          param: "Hemoglobin",
          value: 12.8,
          unit: "g/dL",
          referenceRange: "12.0 – 16.0 g/dL",
          status: "Within Reference Range",
          flag: "normal",
          confidence: 99,
          sourceDoc: "Blood_Report_Jan_2026.pdf",
          page: 1
        },
        {
          param: "Vitamin D (25-OH)",
          value: 28,
          unit: "ng/mL",
          referenceRange: "30.0 – 100.0 ng/mL",
          status: "Slightly Low",
          flag: "warning",
          confidence: 97,
          sourceDoc: "Blood_Report_Jan_2026.pdf",
          page: 1
        },
        {
          param: "Fasting Glucose",
          value: 108,
          unit: "mg/dL",
          referenceRange: "70.0 – 99.0 mg/dL",
          status: "Review Required",
          flag: "warning",
          confidence: 98,
          sourceDoc: "Blood_Report_Jan_2026.pdf",
          page: 2
        }
      ]
    }
  ],
  trendSeries: {
    Hemoglobin: [
      { date: "Jan 12, 2026", value: 12.8, referenceMin: 12.0, referenceMax: 16.0, unit: "g/dL" },
      { date: "Jun 14, 2026", value: 11.4, referenceMin: 12.0, referenceMax: 16.0, unit: "g/dL" },
      { date: "Oct 08, 2026", value: 10.2, referenceMin: 12.0, referenceMax: 16.0, unit: "g/dL" }
    ],
    Glucose: [
      { date: "Jan 12, 2026", value: 108, referenceMin: 70, referenceMax: 99, unit: "mg/dL" },
      { date: "Jun 14, 2026", value: 114, referenceMin: 70, referenceMax: 99, unit: "mg/dL" },
      { date: "Oct 08, 2026", value: 126, referenceMin: 70, referenceMax: 99, unit: "mg/dL" }
    ],
    "Vitamin D": [
      { date: "Jan 12, 2026", value: 28, referenceMin: 30, referenceMax: 100, unit: "ng/mL" },
      { date: "Jun 14, 2026", value: 22, referenceMin: 30, referenceMax: 100, unit: "ng/mL" },
      { date: "Oct 08, 2026", value: 14, referenceMin: 30, referenceMax: 100, unit: "ng/mL" }
    ]
  },
  medications: [
    {
      id: "med-1",
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice daily",
      source: "Prescription — September 20, 2026",
      status: "Active",
      confidence: 96,
      startDate: "Mar 20, 2026",
      prescribingDoctor: "Dr. A. Sharma"
    },
    {
      id: "med-2",
      name: "Vitamin D3",
      dosage: "60,000 IU",
      frequency: "Weekly",
      source: "Prescription — September 20, 2026",
      status: "Active",
      confidence: 94,
      startDate: "Sep 20, 2026",
      prescribingDoctor: "Dr. A. Sharma"
    },
    {
      id: "med-3",
      name: "Iron Supplement",
      dosage: "100 mg",
      frequency: "Once daily",
      source: "Prescription — June 14, 2026",
      status: "Previous",
      confidence: 88,
      startDate: "Jun 14, 2026",
      prescribingDoctor: "Dr. K. Patel"
    }
  ],
  doctorVisitSummary: {
    patientName: "Raj",
    dateGenerated: "October 08, 2026",
    recentChanges: [
      "Hemoglobin decreased across available records (12.8 → 11.4 → 10.2 g/dL).",
      "Vitamin D is below the reference range shown in the latest report (14 ng/mL).",
      "Fasting Glucose has shown a gradual increase (108 → 114 → 126 mg/dL).",
      "Two active medications listed in recent September 2026 prescription."
    ],
    discussionQuestions: [
      "What could explain the change in my hemoglobin levels over the past 9 months?",
      "Should the Vitamin D result of 14 ng/mL be followed up with dosage adjustments?",
      "Should my medication history (Metformin & Vitamin D3) be reviewed alongside recent glucose numbers?"
    ],
    relevantRecords: [
      { name: "Blood Report — October 2026", type: "Lab Report", date: "Oct 08, 2026" },
      { name: "Blood Report — June 2026", type: "Lab Report", date: "Jun 14, 2026" },
      { name: "Prescription — September 2026", type: "Prescription", date: "Sep 20, 2026" }
    ]
  },
  copilotPrompts: [
    "What changed in my latest report?",
    "Explain my latest blood test.",
    "What medications are in my records?",
    "What should I discuss with my doctor?",
    "Show my hemoglobin trend."
  ],
  copilotChatHistory: [
    {
      id: 1,
      sender: "ai",
      text: "Hello Raj 👋 I'm your MedJourney Health Copilot. I can help answer questions based strictly on your uploaded medical records. How can I assist you today?",
      timestamp: "10:00 AM",
      sources: []
    }
  ]
};
