
const RefundPolicyPage = () => {
  return (
    <div className=" text-[#A6ADBA] min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center text-indigo-400">
          <h1 className="text-4xl font-bold text-indigo-600">Refund Policy</h1>
          <p className="mt-2 text-lg">
            Please read our refund policy carefully before making a purchase.
          </p>
        </header>

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">1. Overview</h2>
          <p className="mt-4 text-lg">
            At CodePathsaal, we are committed to providing our customers with
            high-quality courses. However, we understand that there may be
            occasions when you may need to request a refund. This policy
            outlines the circumstances under which we offer refunds and the
            process for requesting one.
          </p>
        </section>
        <hr className="border-gray-600" />

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">2. Refund Eligibility</h2>
          <p className="mt-4 text-lg">
            You may be eligible for a refund if you meet the following criteria:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Refund requests must be made within 14 days of purchase.</li>
            <li>
              The course content must not have been accessed beyond 20% of the
              total course duration.
            </li>
            <li>
              You must provide a valid reason for the refund request, such as
              technical issues or dissatisfaction with the course content.
            </li>
          </ul>
        </section>
        <hr className="border-gray-600" />

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">
            3. Non-Refundable Circumstances
          </h2>
          <p className="mt-4 text-lg">
            Refunds will not be granted under the following circumstances:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Refund requests made after 14 days of purchase.</li>
            <li>
              Courses that have been accessed beyond 20% of the total course
              duration.
            </li>
            <li>
              Change of mind or personal reasons unrelated to course quality or
              technical issues.
            </li>
            <li>
              Purchases made during promotional periods or with discount codes.
            </li>
          </ul>
        </section>
        <hr className="border-gray-600" />

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">4. Refund Process</h2>
          <p className="mt-4 text-lg">
            To request a refund, please follow these steps:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              Contact our support team at support@codepathsaala.com with your
              order details and the reason for the refund request.
            </li>
            <li>
              Our team will review your request and notify you of the approval
              or rejection of your refund within 7 business days.
            </li>
            <li>
              If approved, the refund will be processed to your original method
              of payment within 14 business days.
            </li>
          </ul>
        </section>
        <hr className="border-gray-600" />

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">5. Partial Refunds</h2>
          <p className="mt-4 text-lg">
            In certain circumstances, partial refunds may be granted (if
            applicable):
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>
              For issues that significantly affected your learning experience
              but where you still wish to continue with the course.
            </li>
            <li>
              If only part of the course was found to be unsatisfactory, while
              other parts met your expectations.
            </li>
          </ul>
        </section>
        <hr className="border-gray-600" />

        <section className="text-justify">
          <h2 className="text-3xl font-semibold text-indigo-400">6. Contact Us</h2>
          <p className="mt-4 text-lg">
            If you have any questions about our refund policy, please contact
            us:
          </p>
          <p className="mt-4 text-lg">Email: support@codepathsaala.com</p>
          <p className="mt-4 text-lg">
            Address: CodePathsaala, Cubeway Avenue, Ahemdabad (Gujrat), CA 94043
          </p>
        </section>

        <footer className="text-center mt-8">
          <p className="text-lg text-indigo-400">
            &copy; {new Date().getFullYear()} CodePathsaala. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
