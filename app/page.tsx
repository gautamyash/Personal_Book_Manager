import Link from "next/link";

const features = [
  {
    icon: "\u{1F4DA}",
    title: "Book Management",
    items: ["Add books", "Edit books", "Delete books"],
  },
  {
    icon: "\u{1F4D6}",
    title: "Reading Progress",
    items: ["Want to Read", "Reading", "Completed"],
  },
  {
    icon: "\u{1F3F7}\uFE0F",
    title: "Tags & Filters",
    items: ["Organize books with tags", "Filter by status and tags"],
  },
  {
    icon: "\u{1F512}",
    title: "Secure Authentication",
    items: ["Signup", "Login", "JWT Authentication"],
  },
];

export default function Home() {
  return (
    <main className="app-page">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Personal library tracking made simple
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Personal Book Manager
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Organize your personal library, track your reading progress, and
            manage your books with a clean and simple dashboard.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="app-button app-button-primary"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="app-button app-button-secondary"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="app-card p-6"
              >
                <div className="text-3xl">{feature.icon}</div>

                <h2 className="mt-4 text-xl font-semibold">{feature.title}</h2>

                <ul className="mt-4 space-y-2 text-slate-600">
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="app-card mx-auto max-w-4xl p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold">
            Ready to organize your reading journey?
          </h2>

          <Link
            href="/signup"
            className="app-button app-button-primary mt-8"
          >
            Start Now
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        Personal Book Manager {"\u00A9"} 2026
      </footer>
    </main>
  );
}
