import TreatmentPlanBuilder from '@/components/TreatmentPlanBuilder';

export default function TreatmentPlanPage({ params }) {
  return <TreatmentPlanBuilder patientId={params.id} />;
}
