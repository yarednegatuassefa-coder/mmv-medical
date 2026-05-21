'use client';

import React, { useState } from 'react';

// Define the shape of our patient lead data
interface Patient {
  id: string;
  name: string;
  age: number;
  country: string;
  language: string;
  treatment: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Scheduled';
  urgency: 'High' | 'Medium' | 'Low';
  details: string;
  dateAdded: string;
}

export default function DashboardContainer() {
  const [activeTab, setActiveTab] = useState<'leads' | 'knowledge'>('leads');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Hardcoded mockup data matching your clinic needs
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Liam Henderson',
      age: 45,
      country: 'United Kingdom',
      language: 'English',
      treatment: 'Dental Implants (Full Mouth)',
      status: 'New',
      urgency: 'High',
      details: 'Patient has severe bone loss in upper jaw. Requesting all-on-4 or all-on-6 options. Has a panoramic X-ray ready to send via WhatsApp.',
      dateAdded: '2026-05-20'
    },
    {
      id: '2',
      name: 'Sarah Lindqvist',
      age: 34,
      country: 'Sweden',
      language: 'English',
      treatment: 'Hair Transplant',
      status: 'Contacted',
      urgency: 'Medium',
      details: 'Interested in FUE method for hairline restoration. Sent initial photos. Waiting on clinic doctor evaluation for graft count.',
      dateAdded: '2026-05-19'
    }
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Top Title Section */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">MMV Patient Coordinator Hub</h1>
          <p className="text-slate-400 text-sm mt-1">Live qualification and triage command panel.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'leads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Leads Pipeline
          </button>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'knowledge' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Knowledge Base
          </button>
        </div>
      </div>

      {/* Main Content Render Layout */}
      {activeTab === 'leads' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Patient Leads */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col">
            <div className="p-4 bg-slate-900 border-b border-slate-800">
              <h2 className="font-semibold text-white">Incoming Leads</h2>
            </div>
            <div className="divide-y divide-slate-800 overflow-y-auto flex-1">
              {patients.map((patient) => (
                <div 
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-4 cursor-pointer transition ${selectedPatient?.id === patient.id ? 'bg-blue-950/40 border-l-4 border-blue-500' : 'hover:bg-slate-800/40'}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">{patient.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      patient.urgency === 'High' ? 'bg-red-950 text-red-400 border border-red-900' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {patient.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{patient.treatment}</p>
                  <div className="flex justify-between items-center mt-3 text-[11px] text-slate-500">
                    <span>{patient.country}</span>
                    <span>{patient.dateAdded}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Workspace Panel */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-[600px] overflow-y-auto">
            {selectedPatient ? (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-900 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {selectedPatient.status} Lead Status
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3">{selectedPatient.name}</h2>
                  <p className="text-slate-400 text-sm">{selectedPatient.country} • Age {selectedPatient.age} • Language: {selectedPatient.language}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requested Medical Treatment</h4>
                  <p className="text-base text-white bg-slate-950 p-3 rounded-lg border border-slate-800/60 font-medium">
                    {selectedPatient.treatment}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Notes & Case History</h4>
                  <p className="text-sm text-slate-300 bg-slate-950 p-4 rounded-lg border border-slate-800/60 leading-relaxed italic">
                    "{selectedPatient.details}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button className="px-4 py-2 bg-slate-800 text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-700 transition">
                    Mark as Contacted
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition shadow-md shadow-blue-900/20">
                    Open WhatsApp Chat
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                <p className="text-lg font-medium">No Lead Selected</p>
                <p className="text-sm text-slate-600">Select a patient profile from the pipeline row to view full triage workspace details.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Knowledge Base Tab View Layout */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Clinic Reference & Onboarding Guide</h2>
            <p className="text-slate-400 text-sm mt-1">Quick operational parameters for dental treatments and international coordinator workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800/60 space-y-2">
              <h3 className="font-semibold text-blue-400 text-sm uppercase tracking-wider">Dental Implant Timelines</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                All-on-4 / All-on-6 structural restoration require two separate trips to Istanbul. Phase 1 takes 5 days for surgery and temporary bridges. Phase 2 occurs 3 months later for final porcelain or zirconium loading.
              </p>
            </div>
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800/60 space-y-2">
              <h3 className="font-semibold text-purple-400 text-sm uppercase tracking-wider">Patient Onboarding Rule</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Always request high-resolution panoramic radiographs (X-rays) before issuing official pricing charts. If the patient does not have one, arrange an initial free clinical scan upon their arrival at the clinic hub.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
