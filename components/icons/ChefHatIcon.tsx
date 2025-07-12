
import React from 'react';

const ChefHatIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={className}
  >
    <path d="M19.8 11.7a2.4 2.4 0 0 0-1.2-4.4l-3.2-1.3a2.4 2.4 0 0 0-2.8 1.4L12 9" />
    <path d="M12 9l-2.2-5.4A2.4 2.4 0 0 0 7.4 2.3L4.2 3.6a2.4 2.4 0 0 0-1.2 4.4L3 12" />
    <path d="M3 12h18" />
    <path d="M3 12v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
  </svg>
);

export default ChefHatIcon;
