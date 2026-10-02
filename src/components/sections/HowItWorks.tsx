const steps = [
  { title: "Choose your clean", text: "Pick a service, your address and a time that works for you." },
  { title: "Get matched", text: "A vetted cleaner near you accepts the job, usually within minutes." },
  { title: "Relax", text: "Track your cleaner live, then pay and rate them in the app." },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand-200">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Three steps to a clean home</h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="grid size-10 place-items-center rounded-full bg-brand-500 font-semibold">{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
