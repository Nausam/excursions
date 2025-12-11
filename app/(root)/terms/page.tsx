// app/terms/page.tsx

export const metadata = {
  title: "Terms & Conditions | La Via Maldives",
  description:
    "Read the terms and conditions for using La Via Maldives and joining our excursions, liveaboards and dive trips.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-[min(1100px,94vw)] py-10 md:py-16 mt-10">
      <div className="rounded-[32px] bg-gradient-to-b from-sky-50/70 via-white to-sky-50/60 p-6 shadow-xl ring-1 ring-sky-100/60 md:p-10">
        <header className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Terms &amp; Conditions
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Last updated: 11 December 2025
          </p>
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700 md:text-[15px]">
          <section>
            <h2 className="text-base font-bold text-slate-900">
              1. Who we are
            </h2>
            <p className="mt-2">
              La Via Maldives (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
              is a Maldivian travel operator offering excursions, diving and
              liveaboard trips in the Maldives. These Terms &amp; Conditions
              (&quot;Terms&quot;) govern your use of our website{" "}
              <span className="font-mono">laviatravels.com</span> (the
              &quot;Site&quot;) and any enquiries or bookings you make through
              it, or via WhatsApp, email or other channels we provide.
            </p>
            <p className="mt-2">
              By using the Site, you agree to these Terms. If you do not agree,
              please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              2. What our site does
            </h2>
            <p className="mt-2">
              The Site is mainly an information and enquiry platform. Most
              bookings are finalised manually through WhatsApp, email or other
              direct communication. In some cases, you may be redirected to a
              third-party platform (for example for payments or additional
              booking management) which will have its own terms and conditions.
            </p>
            <p className="mt-2">
              If there is any conflict between these Terms and the terms of a
              specific booking contract or third-party operator, the specific
              booking or operator terms will usually apply for that booking.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              3. Eligibility
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You are at least 18 years old, or using the Site with the
                consent and supervision of a parent or guardian.
              </li>
              <li>You have legal capacity to enter into a binding contract.</li>
              <li>
                Any information you give us is true, accurate and complete.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              4. Acceptable use
            </h2>
            <p className="mt-2">You agree that you will not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Use the Site for any unlawful or fraudulent purpose.</li>
              <li>
                Attempt to interfere with or compromise the security or proper
                functioning of the Site.
              </li>
              <li>
                Scrape, copy or reuse our content for a competing service
                without our written permission.
              </li>
              <li>
                Upload or send content that is illegal, offensive, misleading or
                infringes the rights of others.
              </li>
            </ul>
            <p className="mt-2">
              We may suspend or block access to the Site if we reasonably
              believe these Terms are being violated.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              5. Information, pricing &amp; availability
            </h2>
            <p className="mt-2">
              We aim to keep all information on the Site accurate and up to
              date. This includes trip descriptions, sample itineraries,
              indicative pricing and availability windows. However:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Marine life is wild. Sightings of mantas, whale sharks, sharks
                and other animals can never be guaranteed.
              </li>
              <li>
                Itineraries may change at short notice due to weather, safety,
                currents or operational reasons.
              </li>
              <li>
                Prices and availability are always subject to confirmation at
                the time of booking.
              </li>
            </ul>
            <p className="mt-2">
              We reserve the right to correct errors, update prices and modify
              or discontinue trips at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              6. Bookings, payments &amp; cancellations
            </h2>
            <p className="mt-2">
              Exact booking, payment and cancellation terms will be shared with
              you when you make a reservation (for example by invoice, email or
              PDF). Those specific terms override this summary.
            </p>
            <p className="mt-2">In general:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                A deposit is usually required to secure your place on a trip.
              </li>
              <li>
                The remaining balance is due by a date specified in your booking
                confirmation.
              </li>
              <li>
                Cancellation fees may apply depending on how close to departure
                you cancel.
              </li>
              <li>
                If we must cancel a trip for safety or operational reasons, we
                will offer a change of dates, an alternative trip or a refund as
                described in your specific booking conditions.
              </li>
            </ul>
            <p className="mt-2">
              We strongly recommend comprehensive travel and diving insurance
              that covers medical issues, cancellations, missed flights and
              activities.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              7. Third-party services &amp; operators
            </h2>
            <p className="mt-2">
              We work with local partners such as hotels and guesthouses,
              liveaboard vessels, dive centres, boat operators and transport
              providers. These partners run their own operations and may have
              their own rules, waivers and liability limitations.
            </p>
            <p className="mt-2">
              While we choose reputable and licensed operators, we are not
              responsible for their independent actions, omissions, equipment or
              separate terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              8. Health, safety &amp; diving requirements
            </h2>
            <p className="mt-2">
              Many of our experiences involve physical activity and water-based
              environments. For diving and shark encounters in particular, you
              must:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Be in suitable physical health for the activity.</li>
              <li>
                Hold the required certification level (for example Open Water,
                Advanced Open Water or higher, as specified).
              </li>
              <li>
                Follow all safety briefings and instructions from guides and
                dive leaders.
              </li>
            </ul>
            <p className="mt-2">
              We or our partners may refuse participation if you do not meet
              safety or certification requirements, appear under the influence
              of alcohol or drugs, or if conditions make an activity unsafe. No
              refund is normally given if you cannot participate because you did
              not meet stated requirements or refused to follow safety
              instructions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              9. Intellectual property
            </h2>
            <p className="mt-2">
              Unless otherwise stated, the Site and its contents (including
              text, photos, graphics, logos and layout) are owned by us or used
              with permission. You may view and print content for your personal,
              non-commercial use only.
            </p>
            <p className="mt-2">
              You may not copy, reproduce, modify, distribute or publicly
              display any part of the Site for commercial purposes without our
              prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              10. Disclaimer &amp; limitation of liability
            </h2>
            <p className="mt-2">
              The Site is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. We do not guarantee that the Site will be
              error-free or uninterrupted, or that all content will always be
              complete and up to date.
            </p>
            <p className="mt-2">
              To the fullest extent permitted by law, we are not liable for any
              indirect, incidental, special or consequential loss arising from
              your use of the Site or participation in trips. Our total
              liability for any direct loss is limited to the total amount you
              paid us for the booking related to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              11. Indemnity
            </h2>
            <p className="mt-2">
              You agree to indemnify and hold us harmless from any claims,
              damages, losses or expenses (including reasonable legal fees)
              arising from your use of the Site, your breach of these Terms or
              your violation of any law or third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              12. Changes to these Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. When we do, we will
              change the &quot;Last updated&quot; date at the top of this page.
              The updated Terms will apply from the date they are posted on the
              Site. By continuing to use the Site, you agree to the updated
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              13. Governing law &amp; jurisdiction
            </h2>
            <p className="mt-2">
              These Terms are governed by the laws of the Republic of Maldives
              (unless a different jurisdiction is specified in your booking
              confirmation where required by law). Any disputes will be brought
              before the competent courts of the Maldives, unless mandatory law
              states otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900">
              14. Contact us
            </h2>
            <p className="mt-2">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                className="text-sky-700 underline decoration-sky-300 underline-offset-2"
                href="mailto:hello@laviamaldives.com"
              >
                hello@laviamaldives.com
              </a>{" "}
              or WhatsApp / phone{" "}
              <a
                className="text-sky-700 underline decoration-sky-300 underline-offset-2"
                href="https://wa.me/9607557042"
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
