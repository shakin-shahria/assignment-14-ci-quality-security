function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function formatResponse(status, message, payload = null) {
  return {
    status,
    message,
    data: payload,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  add,
  subtract,
  formatResponse
};
