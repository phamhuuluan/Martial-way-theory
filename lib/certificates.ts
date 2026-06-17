'use client';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { createHtml2CanvasOnClone } from '@/lib/html2canvas-color-compat';
import { formatDate } from '@/lib/utils';

const HTML2CANVAS_BASE_OPTIONS = {
  scale: 2,
  backgroundColor: '#1A1814',
  useCORS: true,
} as const;

function captureCertificateCanvas(element: HTMLElement) {
  return html2canvas(element, {
    ...HTML2CANVAS_BASE_OPTIONS,
    onclone: createHtml2CanvasOnClone(element),
  });
}

export async function downloadCertificatePNG(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await captureCertificateCanvas(element);

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadCertificatePDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await captureCertificateCanvas(element);

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [800, 560] });
  pdf.addImage(imgData, 'PNG', 0, 0, 800, 560);
  pdf.save(`${filename}.pdf`);
}

export function getCertificateFilename(beltName: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `pqq-chung-nhan-${beltName.toLowerCase().replace(/\s+/g, '-')}-${date}`;
}

export { formatDate };
