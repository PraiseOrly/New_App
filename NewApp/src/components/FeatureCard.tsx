import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandableContent: React.ReactNode;
  linkTo: string;
  stats?: string;
}


const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  expandableContent,
  linkTo
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      {/* Expandable Content */}
      {isExpanded && <div className="border-t border-gray-200 pt-4 mt-4">
          {expandableContent}
        </div>}
      <div className="flex items-center justify-between mt-6">
        <Link to={linkTo} className="text-red-600 hover:text-red-800 font-medium">
          Learn More
        </Link>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-600 hover:text-gray-900 flex items-center focus:outline-none">
          {isExpanded ? <>
              <span className="mr-1 text-sm">Show Less</span>
              <ChevronUpIcon size={16} />
            </> : <>
              <span className="mr-1 text-sm">Show More</span>
              <ChevronDownIcon size={16} />
            </>}
        </button>
      </div>
    </div>;
};
export default FeatureCard;