import React from 'react';
import { ProjectType } from '../../types/project';

interface FilterButtonProps {
    type: ProjectType;
    isActive: boolean;
    onClick: (type: ProjectType) => void;
  }
  
export const FilterButton: React.FC<FilterButtonProps> = ({ type, isActive, onClick }) => {
    const displayName = type.charAt(0).toUpperCase() + type.slice(1);
    return (
      <button
        className={`px-4 py-2 rounded ${
          isActive 
            ? 'bg-black text-white' 
            : 'bg-white text-black border border-black hover:bg-gray-300'
        }`}
        onClick={() => onClick(type)}
      >
        {type === 'all' ? 'All Projects' : displayName}
      </button>
    );
  };
  