import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useHealthData } from '../context/HealthDataContext';
import { uploadMedicalDocument } from '../services/api';

export const UploadBox = ({ onStartProcessing }) => {
  const { t } = useLanguage();
  const { setUploadedFile, setProcessingState } = useHealthData();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSelectFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid PDF, JPG, JPEG, or PNG file.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10 MB limit.');
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress smoothly
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setUploading(false);
        setUploadedFile({
          name: selectedFile.name,
          type: selectedFile.type.includes('pdf') ? 'PDF' : 'Image',
          size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          rawFile: selectedFile
        });
      }
    }, 150);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (onStartProcessing) {
      onStartProcessing();
    } else {
      setProcessingState({ isProcessing: true, step: 1, completed: false });
      navigate('/app/processing');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
          dragActive
            ? 'border-teal-500 bg-teal-50/60 shadow-glow'
            : file
            ? 'border-emerald-300 bg-emerald-50/30'
            : 'border-slate-300 hover:border-teal-400 bg-white hover:bg-slate-50/80 shadow-soft'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 shadow-sm">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">{t('dragDropText')}</h4>
            <p className="text-xs text-slate-500 font-medium mb-4">{t('orBrowse')}</p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg">{t('supportedFormats')}</span>
              <span>•</span>
              <span>{t('maxFileSize')}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {file.type.includes('pdf') ? 'PDF Document' : 'Image File'} • {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>

            {/* Upload Progress Bar */}
            {uploading ? (
              <div className="w-full max-w-xs mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Ready for analysis
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button */}
      {file && !uploading && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-700/25 hover:shadow-teal-700/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{t('analyzeWithAI')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
