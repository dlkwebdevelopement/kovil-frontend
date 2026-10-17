import React from 'react';

const TopBar = () => {
  return (
    <div className="pt-3 pb-2 bg-transparent">
      <div className="container mx-auto px-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm text-[#8B0000] border-r border-[#8B0000]/20 pr-4 font-tamil">
            திறக்கும் நேரம்: 5:30 AM - 12:00 PM | 4:30 PM - 8:30 PM
          </span>
          <div className="flex space-x-2">
            <a href="#" className="text-[#8B0000] hover:text-[#4B2E15] transition-colors"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-[#8B0000] hover:text-[#4B2E15] transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-[#8B0000] hover:text-[#4B2E15] transition-colors"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="flex space-x-3 text-sm font-bold text-[#8B0000]">
          <a href="#" className="hover:text-[#4B2E15] transition-colors font-tamil">தமிழ்</a>
          <span>|</span>
          <a href="#" className="hover:text-[#4B2E15] transition-colors">English</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
