import "./dns-debug"; // sets servers on BOTH the callback and promises dns resolvers, and logs every SRV/TXT call the driver makes
import dns from "dns";
import { isMainThread, threadId } from "worker_threads";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  console.log(
    "[connectDB] pid",
    process.pid,
    "isMainThread",
    isMainThread,
    "threadId",
    threadId,
    "- dns servers right now:",
    dns.getServers()
  );

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose)
      .catch((err) => {
        // Without this, a failed connection attempt (e.g. a DNS timeout)
        // stays cached forever and every subsequent request just re-awaits
        // the same dead promise instead of retrying.
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
