export default function fromPairs(pairs) {
  return pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1];
    return cache;
  }, {});
}
