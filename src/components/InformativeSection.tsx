import React from 'react';

interface InformativeSectionProps {
  text1: string;
  text2: string;
}

const InformativeSection: React.FC<InformativeSectionProps> = ({ text1, text2 }) => {

  return (
    <div className=" m-4 md:mx-56 bg-gradient-to-br from-[#ff522fbe] to-[#f09619bf] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-3xl shadow-2xl">
      <div className="absolute inset-0 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* <div className="text-center mb-12">
          <h2 className="text-xl font-extrabold tracking-tight sm:text-5xl mb-4">{title}</h2>
        </div> */}

        <div className="mt-2 grid gap-8 lg:grid-cols-2">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-white text-xl">{text1}</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
            <p className="text-white text-xl">{text2}</p>
          </div>
        </div>

        {/* <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <feature.icon className="h-10 w-10 text-yellow-500 mb-2" />
              <p className="text-center font-medium">{feature.text}</p>
            </div>
          ))}
        </div> */}

        {/* <div className="mt-12 text-center">
          <a
            href="#learn-more"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-[#ff522f] bg-white hover:bg-gray-100 transition-all hover:scale-105"
          >
            Conoce más
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default InformativeSection;