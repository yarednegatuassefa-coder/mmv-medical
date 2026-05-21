import { z } from 'zod';

// Define the exact data contract for the qualification agent output
export const PatientQualificationSchema = z.object({
  fullName: z.string().min(2, "Patient name must be captured"),
  contactLanguage: z.string().default("en"),
  originCountry: z.string().min(2, "Country of residence is required"),
  
  // Identifies which treatment branch the lead belongs to
  clinicalCategory: z.enum(['Dental', 'Hair', 'Bariatric', 'Ortho', 'Aesthetics', 'Unknown']),
  
  // Specific structured details for dental triage
  dentalDetails: z.object({
    missingTeethCount: z.number().int().min(0).default(0),
    hasXRay: z.boolean().default(false),
    primaryComplaint: z.string().optional(),
    estimatedBudgetEuro: z.number().optional()
  }).optional(),
  
  // Urgent triage validation flags for the manager dashboard
  urgencyScore: z.number().min(1).max(5).default(1),
  nextActionRequired: z.string()
});

export type PatientQualification = z.infer<typeof PatientQualificationSchema>;
