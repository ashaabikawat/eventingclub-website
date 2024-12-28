import React from "react";

const page = () => {
  return (
    <div className="md:py-8  md:px-6 px-4 py-8 font-Atkinson">
      <h1 className="font-poppins md:text-2xl text-xl font-bold">
        Privacy Policy
      </h1>
      <p className="font-semibold mt-8">
        Effective and last updated on Dec 12, 2024
      </p>
      <p className="mt-3 md:text-base text-sm">
        Eventing Club ("we," "our," or "us") is committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, disclose, and
        safeguard your information when you visit our website, mobile
        application, or engage with our services. By using our services, you
        agree to the terms outlined in this Privacy Policy.
      </p>

      <div className="mt-3 flex flex-col gap-4 md:text-base text-sm leading-relaxed">
        <div className="flex flex-col gap-2">
          <div>
            <p>
              We may collect the following personal information when you
              interact with our platform:
            </p>
            <ol className="list-[lower-alpha] list-inside">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing address</li>
              <li>
                Payment information (processed securely through third-party
                payment gateways)
              </li>
              <li>
                Government-issued identification for specific events (where
                required)
              </li>
            </ol>
          </div>

          <div>
            <p>We may also collect non-personal information such as:</p>
            <ol className="list-[lower-alpha] list-inside">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>IP address</li>
              <li>Pages viewed and time spent on the site</li>
            </ol>
          </div>
        </div>

        <div>
          <p>We collect information in the following ways:</p>
          <ol className="list-[lower-roman] list-inside">
            <li>
              <span>Directly from you:</span> When you register, purchase
              tickets, or interact with our customer support.
            </li>
            <li>
              <span>Automatically:</span> Through cookies, log files, and other
              tracking technologies.
            </li>
            <li>
              <span>Third-party integrations:</span> If you use social login
              features (e.g., Google or Facebook).
            </li>
          </ol>
        </div>

        <div>
          <p>We use your information to:</p>
          <ol className="list-[lower-roman] list-inside">
            <li> Process your ticket bookings and deliver related services.</li>
            <li>
              Send confirmation emails, event updates, and promotional offers.
            </li>
            <li>Improve user experience through analytics and feedback.</li>
            <li>Detect and prevent fraudulent activities.</li>
            <li>Comply with legal obligations and resolve disputes.</li>
          </ol>
        </div>

        <div>
          <p>We use cookies and similar technologies to:</p>
          <ol className="list-[lower-alpha] list-inside">
            <li>
              Recognize your preferences and provide a personalized experience.
            </li>
            <li> Analyze website traffic and improve our platform.</li>
            <li>Serve targeted advertisements.</li>
          </ol>
          <p>
            You can control cookies through your browser settings. However,
            disabling cookies may limit certain functionalities of our platform.
          </p>
        </div>

        <div>
          <p>
            We do not sell your personal information. However, we may share your
            data in the following circumstances:
          </p>
          <ol className="list-[lower-roman] list-inside">
            <li>
              <span>With event organizers:</span>
              To facilitate your ticket purchase and event access.
            </li>
            <li>
              <span>With service providers:</span>
              Such as payment gateways, email marketing platforms, and IT
              support.
            </li>
            <li>
              <span>With legal authorities:</span>
              When required to comply with laws or protect our legal rights.
            </li>
            <li>
              <span>With advertisers: </span>
              For non-identifiable behavioral data to deliver targeted ads.
            </li>
          </ol>
        </div>

        <div>
          <p>
            We retain your information for as long as necessary to fulfill the
            purposes outlined in this policy or as required by law. If you
            request account deletion, your account and data will be permanently
            removed, except for information retained to comply with legal
            obligations (e.g., transaction records).
          </p>
        </div>

        <div>
          <p>You have the right to:</p>
          <ol className="list-[lower-roman] list-inside">
            <li>Access and update your personal information.</li>
            <li>
              Opt-out of promotional emails by clicking the "unsubscribe" link.
            </li>
            <li>
              Request account deletion by contacting us at{" "}
              <a href="mailto:hello@eventingclub.in">hello@eventingclub.in</a>
            </li>
          </ol>
        </div>

        <div>
          <p>
            We implement robust security measures to protect your information,
            including:
          </p>
          <ol className="list-inside list-[lower-roman]">
            <li>Encryption of sensitive data during transmission.</li>
            <li>Secure servers and firewalls.</li>
            <li>Regular audits and security updates.</li>
          </ol>
          <p>
            However, no method of transmission or storage is 100% secure. Please
            notify us immediately if you suspect unauthorized access to your
            account
          </p>
        </div>

        <div>
          <p>
            Our platform may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these external
            sites. Please review their privacy policies before sharing your
            data.
          </p>
        </div>

        <div>
          <p>
            We may display advertisements through third-party ad networks. These
            networks may use non-identifiable information about your visits to
            serve targeted ads. You can opt-out of interest-based ads via your
            browser or device settings.
          </p>
        </div>

        <div>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page, and your continued use of our services
            constitutes acceptance of these updates.
          </p>
        </div>

        <div>
          <p className="">
            If you have any questions or concerns about these Terms, please
            contact us at:
          </p>
          <div className="">
            <p className="font-bold">
              Email:{" "}
              <a href="mailto:hello@eventingclub.in" className="font-normal">
                hello@eventingclub.in
              </a>
            </p>
            <p className="font-bold">
              Phone:{" "}
              <a href="tel:+919730589111" className="font-normal">
                +91 - 9730589111
              </a>
            </p>
            <p>
              Address:{" "}
              <span>
                Eventing Club, 334/4, Neelkamal Building, Nazarana Compound,
                Bhiwandi, Maharashtra 421308
              </span>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 md:text-xl">
        Thank you for trusting Eventing Club. We value your privacy and are
        committed to ensuring your data is secure.
      </p>
    </div>
  );
};

export default page;
