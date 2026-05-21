'use client';

import React, { useState, useEffect } from 'react';

interface PatientRow {
  id: string;
  full_name: string;
  contact_language: string;
  origin_country: string;
  clinical_category: 'Dental' | 'Hair' | 'Bariatric' | 'Ortho' | 'Aesthetics' | 'Unknown';
  missing_teeth_count: number;
  has_xray: boolean;
  primary_complaint: string | null;
  urgency_score: number;
  next_action_required: string;
  created_at: string;
}

export default function DashboardContainer() {
  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientRow | null>(null);
  const [aiDraft, setAiDraft] = useState<string>('');
  const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // 1. Fetch qualified lead records from your backend spine on view load
  useEffect(() => {
    async function fetchLeads() {
      try {
        // Replace with your true app fetch endpoint path when ready
        const res = await fetch('/api/patients/list'); 
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
          if (data.length > 0) setSelectedPatient(data[0]);
        } else {
          // Mock data fallback if backend route isn't completely built yet
          const mockData: PatientRow[] = [
            {
              id: "61a5b821-1290-4c11-bc01-e23000994a51",
              full_name: "Liam Henderson",
              contact_language: "en",
              origin_country: "United Kingdom",
              clinical_category: "Dental",
              missing_teeth_count: 4,
              has_xray: true,
              primary_complaint: "Needs complete full arch restoration over implant bridges.",
              urgency_score: 5,
              next_action_required: "Verify dental clinic panoramic radiograph details immediately.",
              created_at: new Date().toISOString()
            },
            {
              id: "9218bcda-8812-411a-ab01-f12009aa2231",
              full_name: "Sarah Lindqvist",
              contact_language: "en",
              origin_country: "Sweden",
              clinical_category: "Hair",
              missing_teeth_count: 0,
              has_xray: false,
              primary_complaint: "Inquiring about 4000 grafts FUE hairline surgery pricing packages.",
              urgency_score: 3,
              next_action_required: "Request high-resolution pictures of crown thinning patterns.",
              created_at: new Date().toISOString()
            }
          ];
          setPatients(mockData);
          setSelectedPatient(mockData[0]);
        }
      } catch (err) {
        console.error("Dashboard list grab failed", err);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchLeads();
  }, []);

  // 2. Trigger the high-judgment Claude API endpoint request for responses
  const handleTriggerDraft = async (patientId: string) => {
    setIsLoadingDraft(true);
    setAiDraft('');
    try {
      const response = await fetch('/api/patient/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId })
      });
      const data = await response.json();
      if (data.success) {
        setAiDraft(data.generatedDraft);
      } else {
        setAiDraft(`Hi ${selectedPatient?.full_name},\n\nThank you for reaching out to MMV Medical! Our medical coordinators are reviewing your case data details right now. Let's arrange a custom consultation shortly.`);
      }
    } catch (error) {
      setAiDraft("Communication channel error generating automatic response draft templates.");
    } finally {
      setIsLoadingDraft(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <p className="text-lg font-medium animate-pulse">Synchronizing Operational Pipeline Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">MMV Intake Coordinator Center</h1>
          <p className="text-sm text-slate-400 mt-1">Cross-border lead triage analytics and automatic drafting engines.</p>
        </div>
        <div className="flex gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl">
          <div className="px-4 py-2 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Queue</p>
            <p className="text-lg font-extrabold text-blue-400">{patients.length} Leads</p>
          </div>
          <div className="border-l border-slate-800 my-1"></div>
          <div className="px-4 py-2 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Triage Level</p>
            <p className="text-lg font-extrabold text-amber-400">Phase 2 Live</p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900/50 border-b border-slate-800">
            <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Incoming Channels Stream</h3>
          </div>
          <div className="divide-y divide-slate-800 max-h-[650px] overflow-y-auto">
            {patients.map((patient) => {
              const isSelected = selectedPatient?.id === patient.id;
              return (
                <div
                  key={patient.id}
                  onClick={() => { setSelectedPatient(patient); setAiDraft(''); }}
                  className={`p-4 cursor-pointer transition flex justify-between items-start ${
                    isSelected ? 'bg-blue-600/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/60'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-bold text-white text-base">{patient.full_name}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400 items-center">
                      <span className="font-semibold text-slate-200">{patient.origin_country}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-slate-800 rounded font-medium text-slate-300">{patient.clinical_category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-xs font-bold px-2 py-1 rounded-md ${
                      patient.urgency_score >= 4 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Priority P{patient.urgency_score}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-2">WhatsApp Live</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
        <div className="lg:col-span-7 flex flex-col gap-6">
          {selectedPatient ? (
            <>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex justify-between items-start border-b border-slate-800/60 pb-4">
                  <div>
                    <span className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md uppercase tracking-wide">
                      {selectedPatient.clinical_category} Department Triage
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">{selectedPatient.full_name}</h2>
                    <p className="text-sm text-slate-400">Target Region: {selectedPatient.origin_country} (Language: {selectedPatient.contact_language.toUpperCase()})</p>
                  </div>
                  <button
                    onClick={() => handleTriggerDraft(selectedPatient.id)}
                    disabled={isLoadingDraft}
                    className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 disabled:opacity-50 transition shadow-lg text-sm"
                  >
                    {isLoadingDraft ? 'Claude is writing...' : 'Draft Response with Claude'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-950/40 p-4 rounded-xl border border-slate-800/40">
                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider font-bold">Missing Teeth Units</span>
                    <p className="text-white font-semibold mt-0.5">{selectedPatient.missing_teeth_count} teeth noted</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs uppercase tracking-wider font-bold">Radiograph Uploaded</span>
                    <p className="text-white font-semibold mt-0.5">{selectedPatient.has_xray ? '✅ Yes (Panoramik)' : '❌ No Radiograph'}</p>
                  </div>
                  <div className="col-span-2 border-t border-slate-800/60 pt-2 mt-1">
                    <span className="text-slate-500 block text-xs uppercase tracking-wider font-bold">Clinical Complaint Context</span>
                    <p className="text-slate-300 mt-1 italic text-sm">"{selectedPatient.primary_complaint || 'No special criteria notes declared'}"</p>
                  </div>
                </div>
              </div>

              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-grow flex flex-col min-h-[300px]">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wider">AI Communication Draft Output</h4>
                  {aiDraft && <span className="text-xs text-green-400 font-medium">✨ Optimized for High-Judgment Empathy</span>}
                </div>
                
                <div className="flex-grow bg-slate-950 rounded-xl p-4 border border-slate-800 text-slate-300 text-sm font-mono whitespace-pre-wrap overflow-y-auto max-h-[350px]">
                  {aiDraft ? aiDraft : (
                    <div className="text-center py-12 text-slate-500 font-sans">
                      <p>No response generated yet for this workspace target panel loop.</p>
                      <p className="text-xs mt-1 text-slate-600">Click the button above to execute Claude 3.5 Sonnet processing metrics.</p>
                    </div>
                  )}
                </div>
                
                {aiDraft && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={() => { navigator.clipboard.writeText(aiDraft); alert("Draft copied securely to clipboard."); }}
                      className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition"
                    >
                      Copy Draft to Clipboard
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 shadow-xl flex-grow flex items-center justify-center">
              <p>Select an incoming prospective lead from the queue dashboard stream to run operations metrics.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
