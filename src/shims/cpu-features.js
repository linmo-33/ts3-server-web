'use strict';

// ssh2 只把 cpu-features 用作可选的性能提示，缺失时可以安全降级。
module.exports = function getCPUFeatures() {
  return null;
};
