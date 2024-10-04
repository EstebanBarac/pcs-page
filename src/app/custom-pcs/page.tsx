import PCConfigurator from '../../components/PCConfigurator'

export default function CustomPCs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Build Your Dream Machine
      </h1>
      <p className="text-xl text-gray-300 mb-8 text-center">
        Customize every aspect of your PC to create the perfect system for your needs.
      </p>
      <PCConfigurator />
    </div>
  )
}