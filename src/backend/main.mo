import Time "mo:core/Time";
import Int "mo:core/Int";
import List "mo:core/List";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Order "mo:core/Order";

actor {
  type PredictionResult = {
    symbol : Text;
    timeframe : Text;
    currentPrice : Float;
    predictedChangePercent : Float;
    confidence : Float;
    signal : Text;
    sma : Float;
    rsi : Float;
    macd : Float;
    volatility : Float;
    momentum : Float;
    sentimentScore : Float;
    sentimentLabel : Text;
    recentPrices : [Float];
  };

  type HistoryRecord = {
    id : Nat;
    timestamp : Int;
    symbol : Text;
    timeframe : Text;
    predictedChangePercent : Float;
    confidence : Float;
    signal : Text;
  };

  type HealthStatus = {
    status : Text;
    version : Text;
    totalPredictions : Nat;
  };

  module HistoryRecord {
    public func compare(a : HistoryRecord, b : HistoryRecord) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  var history = List.empty<HistoryRecord>();
  var totalPredictions = 0;

  public shared ({ caller }) func predict(symbol : Text, timeframe : Text) : async PredictionResult {
    let now = Time.now();
    let basePrice = switch (symbol) {
      case ("BTC/USDT") { 45000 };
      case ("ETH/USDT") { 2500 };
      case ("SOL/USDT") { 150 };
      case ("AAPL") { 185 };
      case ("TSLA") { 250 };
      case ("GOOGL") { 160 };
      case ("MSFT") { 400 };
      case ("NVDA") { 800 };
      case (_) { 100 };
    };

    let firstValue = basePrice.toFloat();
    let prices = List.repeat(firstValue, 100);

    let last20 = List.fromArray(prices.toArray().sliceToArray(0, 20));
    let sma = last20.values().foldLeft(0.0, Float.add) / 20.0;

    let rsi = 50.0;
    let macd = 0.0;
    let volatility = now.toFloat() % 0.03;
    let momentum = 0.5;

    let sentimentScore = 0.1;
    let sentimentLabel = if (sentimentScore > 0.1) { "bullish" } else {
      if (sentimentScore < -0.1) { "bearish" } else {
        "neutral";
      };
    };

    let (signal, predictedChangePercent, confidence) = if (rsi < 35.0 or (momentum > 0.0 and sentimentScore > 0.0)) {
      ("BULLISH", 2.5, 0.92);
    } else {
      if (rsi > 65.0 or (momentum < 0.0 and sentimentScore < 0.0)) {
        ("BEARISH", -2.6, 0.91);
      } else {
        ("NEUTRAL", 0.17, 0.6);
      };
    };
    let result = {
      symbol;
      timeframe;
      currentPrice = 100.0;
      predictedChangePercent;
      confidence;
      signal;
      sma;
      rsi;
      macd;
      volatility;
      momentum;
      sentimentScore;
      sentimentLabel;
      recentPrices = prices.toArray().sliceToArray(0, 20);
    };

    let record = {
      id = totalPredictions;
      timestamp = now;
      symbol;
      timeframe;
      predictedChangePercent;
      confidence;
      signal;
    };

    if (history.size() >= 100) {
      if (not history.isEmpty()) {
        ignore (history.removeLast());
      };
    };

    history.add(record);
    totalPredictions += 1;
    result;
  };

  public query ({ caller }) func getPredictionHistory() : async [HistoryRecord] {
    let size = if (history.size() < 50) { history.size() } else { 50 };
    let sorted = history.toArray().sort();
    if (size > 0) {
      sorted.sliceToArray(0, size);
    } else {
      [];
    };
  };

  public shared ({ caller }) func clearHistory() : async () {
    history.clear();
  };

  public query ({ caller }) func getHealth() : async HealthStatus {
    {
      status = "operational";
      version = "2.0";
      totalPredictions;
    };
  };

  public query ({ caller }) func getSupportedSymbols() : async [Text] {
    [
      "BTC/USDT",
      "ETH/USDT",
      "SOL/USDT",
      "BNB/USDT",
      "AAPL",
      "TSLA",
      "GOOGL",
      "MSFT",
      "AMZN",
      "NVDA",
    ];
  };
};
