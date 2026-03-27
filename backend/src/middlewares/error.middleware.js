

module.exports = (err, req, res, next) => {
  if (err.message === "User not found") {
    return res.status(404).json({ message: err.message });
  }

  if (err.type === 'entity.parse.failed' || err.status === 400) {
    return res.status(400).json({ message: err.message || 'Bad request' });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ message: "Internal server error" });
};