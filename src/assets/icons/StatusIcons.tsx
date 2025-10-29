import React from 'react';

export const LegalIcon = ({ size = 16, color = '#00ff88' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MedicalIcon = ({ size = 16, color = '#ffd700' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const DecriminalizedIcon = ({ size = 16, color = '#00d4ff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IllegalIcon = ({ size = 16, color = '#ff4757' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const UnknownIcon = ({ size = 16, color = '#636e72' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChapterIcon = ({ size = 16, color = '#00ff88' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
          fill={color} stroke={color} strokeWidth="1"/>
  </svg>
);

export const getStatusIcon = (status: string, size = 16) => {
  switch (status) {
    case 'green':
      return <LegalIcon size={size} />;
    case 'lightgreen':
      return <DecriminalizedIcon size={size} />;
    case 'yellow':
      return <MedicalIcon size={size} />;
    case 'orange':
      return <MedicalIcon size={size} color="#ff6b35" />;
    case 'red':
      return <IllegalIcon size={size} />;
    case 'darkred':
      return <IllegalIcon size={size} color="#ff3838" />;
    case 'unknown':
    default:
      return <UnknownIcon size={size} />;
  }
};
