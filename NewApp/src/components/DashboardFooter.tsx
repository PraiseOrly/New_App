import React from 'react';

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} CardiacAI. All rights reserved.
    </footer>
  );
};

export default DashboardFooter;
