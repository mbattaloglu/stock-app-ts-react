import Stock from "../models/stock";

export const stock: Stock = {
  id: 0,
  name: "Example",
  symbol: "EXM",
  price: 197.57,
  previousClose: 198.11,
  change: -0.54,
  changePercent: -0.27,
  time: 0,
};

export const neutralStock: Stock = {
  id: 0,
  name: "Example",
  symbol: "EXM",
  price: 1234567890,
  previousClose: 123456789,
  change: 0, //change is 0
  changePercent: 0, //changePercent is 0
  time: 0,
};

export const increasedStock: Stock = {
  id: 0,
  name: "Example",
  symbol: "EXM",
  price: 987654321,
  previousClose: 123456789,
  change: 864197532,
  changePercent: 0.7,
  time: 0,
};

export const decreasedStock: Stock = {
  id: 0,
  name: "ExAmPle",
  symbol: "ExM",
  price: 123456789,
  previousClose: 987654321,
  change: -864197532,
  changePercent: -0.7,
  time: 0,
};
