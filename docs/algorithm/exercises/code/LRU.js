/**
 * LRU
 * @param {Number} capacity 最大容量
 */
const LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // 存在就更新
    const temp = this.cache.get(key);
    // 先删除该数据，再将其加入到末尾（保证该数据为最近使用数据）
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 存在就更新（先删除后加入）
    this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
    // 不存在就加入
    // 超过缓存最大值，则移除最近最少使用的数据再加入
    const firstKey = this.cache.keys().next().value;
    this.cache.delete(firstKey);
  }
  // 加入
  this.cache.set(key, value);
};
