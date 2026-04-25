/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShortlistedCandidate } from '../types';

export const exportToCSV = (candidates: ShortlistedCandidate[]) => {
  if (candidates.length === 0) return;

  const headers = [
    'Name',
    'Role',
    'Experience (Years)',
    'Skills',
    'Education',
    'Overall Match Score',
    'Technical Fit',
    'Cultural Fit',
    'Interest Score',
    'Match Explanation'
  ];

  const rows = candidates.map(c => [
    `"${c.name.replace(/"/g, '""')}"`,
    `"${c.role.replace(/"/g, '""')}"`,
    c.experienceYears,
    `"${c.skills.join(', ').replace(/"/g, '""')}"`,
    `"${c.education.replace(/"/g, '""')}"`,
    `${c.matchScore.overall}%`,
    `${c.matchScore.technicalFit}%`,
    `${c.matchScore.culturalFit}%`,
    c.outreach ? `${c.outreach.interestScore}%` : 'N/A',
    `"${c.matchScore.explanation.replace(/"/g, '""')}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `talentscout_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
