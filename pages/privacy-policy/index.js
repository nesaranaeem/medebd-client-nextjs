import { NextSeo } from "next-seo";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <>
      <NextSeo
        title="Privacy Policy"
        description="Privacy Policy For Medebd.

        For general inquiries, please use the details below to contact us. We will do our best to respond to your message."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-2xl text-center my-4 font-extrabold text-white">
          Privacy Policy
        </h2>
        <p className="mb-3 font-normal text-white">
          At medebd.com, we take the privacy of our users seriously. This
          Privacy Policy explains how we collect, use, and disclose your
          personal information when you visit or use our website.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Information Collection and Use
        </h2>
        <p className="mb-3 font-normal text-white">
          We collect information from you when you use our website, such as when
          you search for doctors, hospitals, or medicine, or when you create an
          account. This information may include your name, email address, phone
          number, location, and search history. We may also collect information
          about your device and your internet connection, including your IP
          address, browser type, and operating system. We use this information
          to provide and improve our services, to personalize your experience,
          and to communicate with you. We may also use this information to
          analyze website usage, troubleshoot technical issues, and detect and
          prevent fraud.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Cookies and Tracking Technologies
        </h2>
        <p className="mb-3 font-normal text-white">
          We use cookies and other tracking technologies to collect information
          about your use of our website. Cookies are small text files that are
          stored on your device when you visit a website. They help us remember
          your preferences and understand how you use our website. You can
          control the use of cookies on our website through your browser
          settings. However, please note that disabling cookies may limit your
          ability to use certain features of our website.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Google Analytics
        </h2>
        <p className="mb-3 font-normal text-white">
          We use Google Analytics, a web analysis service provided by Google, to
          track and analyze website usage. Google Analytics uses cookies to help
          us understand how visitors interact with our website. The information
          generated by these cookies, such as the number of visitors, the pages
          they visit, and the duration of their visit, is transmitted to and
          stored by Google. You can control the use of Google Analytics cookies
          through the Google Analytics Opt-out Browser Add-on.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Information Sharing and Disclosure
        </h2>
        <p className="mb-3 font-normal text-white">
          We may share your personal information with third parties to provide
          and improve our services, to comply with legal and regulatory
          requirements, and to protect the rights and safety of our users and
          others. We may share your personal information with service providers
          who help us operate our website and deliver our services, such as
          hosting providers, payment processors, and analytics providers. We
          require these service providers to keep your personal information
          confidential and to use it only for the purposes for which it was
          disclosed. We may share your personal information with law
          enforcement, government agencies, or other third parties if we are
          required to do so by law, or if we believe in good faith that such
          disclosure is necessary to protect the rights and safety of our users
          and others.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Data Security
        </h2>
        <p className="mb-3 font-normal text-white">
          We take reasonable steps to protect your personal information from
          unauthorized access, use, or disclosure. However, please note that no
          internet transmission is ever completely secure or error-free. In
          particular, email sent to or from this website may not be secure.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Links to Other Websites
        </h2>
        <p className="mb-3 font-normal text-white">
          Our website may contain links to other websites. Please note that we
          are not responsible for the privacy practices of these other websites.
          We encourage you to read the privacy policies of any website you
          visit.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">
          Changes to this Privacy Policy
        </h2>
        <p className="mb-3 font-normal text-white">
          We may update this Privacy Policy from time to time. If we make
          changes to this Privacy Policy, we will post the updated policy on
          this page and update the Effective Date above. We encourage you to
          review this Privacy Policy periodically to stay informed about how we
          protect your personal information.
        </p>
        <h2 className="text-xl my-2 font-extrabold text-white">Contact Us</h2>
        <p className="mb-3 font-normal text-white">
          If you have any questions or concerns about this Privacy Policy,
          Please{" "}
          <Link className="text-amber-900 font-bold" href="/contact">
            Contact
          </Link>
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;