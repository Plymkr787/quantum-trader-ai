import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

actor {
  type Prediction = {
    prediction : Float;
    confidence : Float;
    rsi : Float;
    macd : Float;
    sma : Float;
    ema : Float;
    signal : Text;
  };

  type PriceRecord = {
    timestamp : Int;
    price : Float;
    volume : Float;
  };

  type Indicators = {
    sma : Float;
    ema : Float;
    rsi : Float;
    macd : Float;
    volatility : Float;
    momentum : Float;
    sentiment : Float;
  };

  func simpleHash(s : Text) : Nat {
    var hash = 7 : Nat;
    for (c in s.chars()) {
      hash := (hash * 31 + c.toNat32().toNat()) % 1000000;
    };
    hash;
  };

  func getBasePrice(symbol : Text) : Float {
    if (symbol.contains(#text("BTC"))) { return 43000.0 };
    if (symbol.contains(#text("ETH"))) { return 2400 };
    if (symbol.contains(#text("AAPL"))) { return 185.0 };
    100.0;
  };

  func randomFloat(seed : Nat, range : Float) : Float {
    ((seed % 10000).toFloat() / 10000.0) * range;
  };

  public query ({ caller }) func predict(symbol : Text, timeframe : Text) : async Prediction {
    let hash = simpleHash(symbol);
    let basePrice = getBasePrice(symbol);
    let variation = randomFloat(hash, 0.1);

    let prediction = (if (hash % 2 == 0) { 1.0 } else { -1.0 }) * variation;
    let confidence = 0.4 + randomFloat(hash + 1, 0.5);
    let rsi = 30.0 + randomFloat(hash + 2, 40.0);
    let macd = randomFloat(hash + 3, 10.0);
    let sma = basePrice + randomFloat(hash + 4, 100.0);
    let ema = basePrice + randomFloat(hash + 5, 100.0);
    let signal = if (prediction >= 0) { "BULLISH" } else { "BEARISH" };

    {
      prediction;
      confidence;
      rsi;
      macd;
      sma;
      ema;
      signal;
    };
  };

  public query ({ caller }) func getPriceHistory(symbol : Text, limit : Nat) : async [PriceRecord] {
    let hash = simpleHash(symbol);
    let basePrice = getBasePrice(symbol);
    let list = List.empty<PriceRecord>();

    for (i in Nat.range(0, limit)) {
      let price = basePrice + randomFloat(hash + i, 100.0) - ((limit - i).toInt() * 5).toFloat() / 10.0;
      let volume = 1000.0 + randomFloat(hash + i + 1, 500.0);
      list.add({
        timestamp = 1720000000 - (i * 3600).toInt();
        price;
        volume;
      });
    };
    list.toArray();
  };

  public query ({ caller }) func getIndicators(symbol : Text) : async Indicators {
    let hash = simpleHash(symbol);
    let basePrice = getBasePrice(symbol);

    {
      sma = basePrice + randomFloat(hash, 100.0);
      ema = basePrice + randomFloat(hash + 1, 100.0);
      rsi = 30.0 + randomFloat(hash + 2, 40.0);
      macd = randomFloat(hash + 3, 10.0);
      volatility = randomFloat(hash + 4, 5.0);
      momentum = randomFloat(hash + 5, 10.0);
      sentiment = (100 - (hash % 20)).toFloat();
    };
  };
};
