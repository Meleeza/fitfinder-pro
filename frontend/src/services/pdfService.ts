import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Measurement {
  bust: number;
  waist: number;
  hips: number;
  bodyType: string;
  email?: string;
}

interface Recommendation {
  brandName: string;
  size: string;
  alternative?: string;
  confidence: number;
  category: string;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

export const generateSizeReportPDF = (
  measurements: Measurement,
  recommendations: Recommendation[]
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(99, 102, 241); // Primary color
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FitFinder Pro', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Personalized Size Guide', pageWidth / 2, 30, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Date
  let yPosition = 50;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, 14, yPosition);
  
  // Measurements Section
  yPosition += 15;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Measurements', 14, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const measurementData = [
    ['Bust', `${measurements.bust} cm`],
    ['Waist', `${measurements.waist} cm`],
    ['Hips', `${measurements.hips} cm`],
    ['Body Type', measurements.bodyType.replace('_', ' ').toUpperCase()]
  ];
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Measurement', 'Value']],
    body: measurementData,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241], fontSize: 10, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' }
    }
  });
  
  // Size Recommendations Section
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Size Recommendations', 14, yPosition);
  
  yPosition += 10;
  
  // Prepare recommendations table data
  const recommendationData = recommendations.map(rec => {
    const priceRange = rec.priceRange 
      ? `${rec.priceRange.currency} ${rec.priceRange.min.toLocaleString()} - ${rec.priceRange.max.toLocaleString()}`
      : 'N/A';
    
    const size = rec.alternative 
      ? `${rec.size} (Alt: ${rec.alternative})`
      : rec.size;
    
    return [
      rec.brandName,
      rec.category,
      size,
      priceRange
    ];
  });
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Brand', 'Category', 'Size', 'Price Range']],
    body: recommendationData,
    theme: 'striped',
    headStyles: { 
      fillColor: [99, 102, 241], 
      fontSize: 10, 
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 9,
      cellPadding: 5
    },
    margin: { left: 14, right: 14 },
    columnStyles: {
      0: { cellWidth: 40, fontStyle: 'bold' },
      1: { cellWidth: 40 },
      2: { cellWidth: 40, halign: 'center', fontStyle: 'bold', textColor: [99, 102, 241] },
      3: { cellWidth: 'auto', fontSize: 8 }
    }
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    
    doc.text(
      'FitFinder Pro - Find Your Perfect Fit',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: 'center' }
    );
  }
  
  // Download the PDF
  const fileName = `FitFinder-Size-Guide-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
