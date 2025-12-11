// app/cookies/page.tsx

export const metadata = {
  title: "Cookie Policy | La Via Maldives",
  description:
    "Information about how La Via Maldives uses cookies and similar technologies on laviatravels.com.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto w-[min(1100px,94vw)] py-10 md:py-16 mt-10">
      <div className="rounded-[32px] bg-gradient-to-b from-sky-50/60 via-white to-emerald-50/60 p-6 shadow-xl ring-1 ring-sky-100/70 md:p-10">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Cookie Policy
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Last updated: 11 December 2025
          </p>
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700 md:text-[15px]">
          <section>
            <h2 className="text-base font-bold text-slate-900">
              1. What are cookies?
            </h2>
            <p className="mt-2">
              Cookies are small text files stored on your device when you visit
              a website. They help the site remember your actions and
              preferences (such as pages visited or language) so you don&apos;t
              have to set them again each time. We also use similar
              technologies, such as pixels or local storage. In this Policy we
              refer to all of these as &quot;cookies&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              2. How we use cookies
            </h2>
            <p className="mt-2">
              On <span className="font-mono">laviatravels.com</span>, cookies
              may be used for:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">
                  Strictly necessary cookies:
                </span>{" "}
                these enable core functionality such as security features and
                basic Site performance. The Site cannot function properly
                without them.
              </li>
              <li>
                <span className="font-semibold">
                  Analytics and performance cookies:
                </span>{" "}
                these help us understand how visitors use the Site (for example,
                which pages are most visited) so we can improve design and
                content.
              </li>
              <li>
                <span className="font-semibold">Functionality cookies:</span>{" "}
                these remember choices you make (such as cookie preferences) and
                enhance your experience.
              </li>
              <li>
                <span className="font-semibold">
                  Advertising/marketing cookies:
                </span>{" "}
                if used, these help us measure how effective our marketing is
                and may be set when you click through from ads or social media.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              3. Examples of cookies we may use
            </h2>
            <p className="mt-2">
              The exact cookies may change over time. Examples include:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Analytics cookies (for example from tools such as Google
                Analytics) that collect anonymised usage statistics.
              </li>
              <li>
                A cookie to remember whether you have dismissed or accepted the
                cookie banner.
              </li>
            </ul>
            <p className="mt-2">
              When we implement or change particular tools, we will update this
              section where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              4. Managing cookies
            </h2>
            <p className="mt-2">
              You have several options to control cookies on your device:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">Browser settings:</span> most
                browsers let you block or delete cookies. Doing so may affect
                how certain parts of the Site function.
              </li>
              <li>
                <span className="font-semibold">
                  Cookie banner or preferences:
                </span>{" "}
                if we display a cookie banner, you can choose to accept or
                reject non-essential cookies. Where available, you can change
                your choice later via a &quot;Cookie settings&quot; link.
              </li>
              <li>
                <span className="font-semibold">Third-party opt-outs:</span>{" "}
                some analytics or advertising providers offer their own tools to
                opt out of tracking within their services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              5. Changes to this Cookie Policy
            </h2>
            <p className="mt-2">
              We may update this Cookie Policy from time to time, for example
              when we add new tools or change how we use cookies. When we do, we
              will update the &quot;Last updated&quot; date at the top. If
              changes are significant, we may also highlight them on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">6. Contact</h2>
            <p className="mt-2">
              If you have any questions about our use of cookies, please contact
              us at{" "}
              <a
                href="mailto:hello@laviamaldives.com"
                className="text-sky-700 underline decoration-sky-300 underline-offset-2"
              >
                hello@laviamaldives.com
              </a>{" "}
              or{" "}
              <a
                href="https://wa.me/9607557042"
                className="text-sky-700 underline decoration-sky-300 underline-offset-2"
              >
                +960 755 7042
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
