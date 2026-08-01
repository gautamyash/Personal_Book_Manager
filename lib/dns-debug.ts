// Diagnostic + fix module. Import this FIRST, before "mongoose"/"mongodb",
// in lib/mongodb.ts.
//
// Why this exists: dns.setServers() (the callback-style top-level API) and
// dns.promises's top-level resolve* functions are backed by two SEPARATE
// default Resolver instances in Node's dns module. Calling dns.setServers()
// only repoints the callback-style resolver. The mongodb driver
// (node_modules/mongodb/lib/connection_string.js) calls
// `dns.promises.resolveSrv` / `dns.promises.resolveTxt` directly - a
// different default resolver that keeps whatever servers Windows originally
// handed it (127.0.0.1) unless you call dns.promises.setServers() too.
//
// This module sets servers on BOTH resolvers, and wraps dns.promises'
// resolveSrv/resolveTxt so every call the driver makes is logged with which
// servers it actually used, how long it took, and whether it succeeded.

import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.promises.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("[dns-debug] callback dns.getServers():", dns.getServers());
console.log("[dns-debug] dns.promises.getServers():", dns.promises.getServers());

const origResolveSrv = dns.promises.resolveSrv.bind(dns.promises);
const origResolveTxt = dns.promises.resolveTxt.bind(dns.promises);

// @ts-expect-error - intentionally patching a core module's promises API for diagnostics
dns.promises.resolveSrv = async (hostname: string) => {
  const start = Date.now();
  console.log(
    `[dns.promises.resolveSrv] START "${hostname}" via`,
    dns.promises.getServers()
  );
  try {
    const result = await origResolveSrv(hostname);
    console.log(
      `[dns.promises.resolveSrv] OK "${hostname}" in ${Date.now() - start}ms ->`,
      result
    );
    return result;
  } catch (err) {
    console.error(
      `[dns.promises.resolveSrv] FAIL "${hostname}" in ${Date.now() - start}ms ->`,
      err
    );
    throw err;
  }
};

// @ts-expect-error - intentionally patching a core module's promises API for diagnostics
dns.promises.resolveTxt = async (hostname: string) => {
  const start = Date.now();
  console.log(
    `[dns.promises.resolveTxt] START "${hostname}" via`,
    dns.promises.getServers()
  );
  try {
    const result = await origResolveTxt(hostname);
    console.log(
      `[dns.promises.resolveTxt] OK "${hostname}" in ${Date.now() - start}ms ->`,
      result
    );
    return result;
  } catch (err) {
    console.error(
      `[dns.promises.resolveTxt] FAIL "${hostname}" in ${Date.now() - start}ms ->`,
      err
    );
    throw err;
  }
};

export {};
