function timeoutMiddleware(req, res, next) {
  // Set a timeout (in milliseconds) for all routes
  const timeoutMillis = 30000; // 30 seconds
  req.setTimeout(timeoutMillis, () => {
    const err = new Error("Request Timeout");
    err.status = 408; // Request Timeout
    next(err);
  });
  next();
}

module.exports = timeoutMiddleware;
