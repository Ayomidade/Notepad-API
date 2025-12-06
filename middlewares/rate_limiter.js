import erl from "express-rate-limit";

export const rateLimiter = erl({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  handler: (req, res) => {
    try {
      res
        .status(429)
        .send({
          message: "Too many requests, please try again in 15 minutes.",
        });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  },
});
