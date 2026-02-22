export default function MarketPulseSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-4">Market Pulse</h2>
      <p className="text-center max-w-xl">
        Real-time market data to help you track trends and make smarter trades.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-700 rounded">Bitcoin: $XXX</div>
        <div className="p-4 bg-gray-700 rounded">Ethereum: $XXX</div>
        <div className="p-4 bg-gray-700 rounded">Altcoins: $XXX</div>
      </div>
    </section>
  );
}
