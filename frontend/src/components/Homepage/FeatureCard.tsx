import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandableContent: React.ReactNode;
  linkTo: string;
  stats?: string;
  features?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  expandableContent,
  linkTo,
  stats,
  features = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out max-w-full sm:max-w-md mx-auto"
      role="region"
      aria-labelledby={`feature-card-title-${title.replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center mb-4">
        <div className="text-red-600">{icon}</div>
        <div className="ml-3">
          <h3
            id={`feature-card-title-${title.replace(/\s+/g, '-')}`}
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </h3>
          {stats && (
            <p className="text-sm font-medium text-red-600 mt-1">{stats}</p>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>

      {/* Features List */}
      {features.length > 0 && (
        <ul className="list-disc list-inside text-gray-600 mb-4 text-sm">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-200 pt-4 mt-4 text-gray-600 text-sm">
          {expandableContent}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <Link
          to={linkTo}
          className="group inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          aria-label={`Learn more about ${title}`}
        >
          <span>Learn More</span>
          <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
        <button
          onClick={toggleExpand}
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors duration-200"
          aria-expanded={isExpanded}
          aria-controls={`expandable-content-${title.replace(/\s+/g, '-')}`}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUpIcon size={16} />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDownIcon size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(FeatureCard);