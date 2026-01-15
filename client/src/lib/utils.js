import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jsPDF } from "jspdf";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const generarPDF = (analysis) => {
  if (!analysis) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Resumen del viaje", 10, 10);

  // Resumen
  doc.setFontSize(12);
  doc.text(`Total distancia: ${analysis.summary.total_distance_km} km`, 10, 20);
  doc.text(`Tiempo estimado: ${analysis.summary.estimated_time_hours} horas`, 10, 30);
  doc.text(`Paradas requeridas: ${analysis.summary.stops_required}`, 10, 40);
  doc.text(`Combustible estimado: ${analysis.summary.fuel_estimated_liters} L`, 10, 50);
  doc.text(`Costo aproximado: $${analysis.summary.cost_estimated_mxn} MXN`, 10, 60);

  // Detalles de ruta
  let yOffset = 70;
  doc.text("Ruta paso a paso:", 10, yOffset);
  analysis.route_details.forEach((step) => {
    yOffset += 10;
    doc.text(`Paso ${step.step}: ${step.location} - ${step.action}`, 10, yOffset);
  });

  // Recomendaciones
  if (analysis.recommendations.length > 0) {
    yOffset += 15;
    doc.text("Recomendaciones:", 10, yOffset);
    analysis.recommendations.forEach((rec) => {
      yOffset += 10;
      doc.text(`- ${rec}`, 10, yOffset);
    });
  }

  // Vehículo sugerido
  yOffset += 15;
  doc.text(`Vehículo sugerido: ${analysis.vehicle_suggested}`, 10, yOffset);

  // Descargar
  doc.save("plan_ruta.pdf");
};
