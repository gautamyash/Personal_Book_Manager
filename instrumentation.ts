// Runs once, guaranteed, before any request-handling code executes in the
// Node.js runtime — this is the correct place for process-level side effects
// like overriding the DNS resolver, independent of route/module load order
// or which Turbopack worker ends up handling a given request.
//
// Root cause: `node -e "console.log(require('dns').getServers())"` returned
// ["127.0.0.1"] on this machine — something (VPN client, Docker Desktop,
// antivirus DNS filtering, etc.) is running a local DNS proxy that Windows
// handed to Node, and it doesn't reliably answer SRV/TXT queries, causing
// `querySrv ETIMEOUT` from `mongodb+srv://`. Forcing known-good public
// resolvers avoids that proxy entirely.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log(
      "[instrumentation] register() ran in pid",
      process.pid,
      "- dns servers now:",
      dns.getServers()
    );
  }
}
