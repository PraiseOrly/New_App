import React from "react";
import { XIcon } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisData: any;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isOpen,
  onClose,
  analysisData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="processing-modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Close modal"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <h2
          id="processing-modal-title"
          className="text-xl font-semibold mb-4 text-gray-900"
        >
          Processing ECG Analysis
        </h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {JSON.stringify(analysisData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
