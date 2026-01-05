import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

//create a ratelimiter that allow 10 requests per 20 seconds

const ratelimit =new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(7, "2 s"),
});

export default ratelimit;