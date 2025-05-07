import React from 'react';

const TopBar = () => {

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          Renewable Energy Projects
        </h1>
      </div>
    </header>
  );
};

export default TopBar;
