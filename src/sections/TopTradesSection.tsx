export default function TopTradesSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-4">Top Trades</h2>
      <p className="text-center max-w-xl mb-6">
        Check out the top performing trades and strategies in the market.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-700 rounded">Trade 1</div>
        <div className="p-4 bg-gray-700 rounded">Trade 2</div>
        <div className="p-4 bg-gray-700 rounded">Trade 3</div>
      </div>
    </section>
  );
}
