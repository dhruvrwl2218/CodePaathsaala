import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-indigo-400 mb-12">About Us</h1>
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Welcome to CodePathSaala!</h2>
            <p className="text-lg">
              At CodePathSaala, we are passionate about empowering learners to achieve their goals through high-quality, accessible education. Our platform offers a wide range of courses, expertly designed to help you master the skills you need in today’s fast-paced digital world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Our Mission</h2>
            <p className="text-lg">
              Our mission is to make learning accessible to everyone, regardless of their background or location. We believe that knowledge is the key to unlocking opportunities, and we are committed to providing a platform where anyone can learn, grow, and succeed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">What We Offer</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="mr-2 text-indigo-400">•</span>
                <p><strong>Comprehensive Courses:</strong> We offer a variety of courses in programming, web development, data science, and more, tailored to different skill levels.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-indigo-400">•</span>
                <p><strong>Expert Instructors:</strong> Our courses are created and taught by industry professionals who bring their real-world experience into the virtual classroom.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-indigo-400">•</span>
                <p><strong>Interactive Learning:</strong> Engage in hands-on projects, quizzes, and peer discussions to deepen your understanding and apply what you’ve learned.</p>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-indigo-400">•</span>
                <p><strong>Flexible Learning:</strong> Learn at your own pace with our on-demand video lectures and downloadable resources.</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Join Us</h2>
            <p className="text-lg">
              Whether you’re just starting your learning journey or looking to enhance your skills, CodePathSaala is here to help you achieve your goals. Join our community of learners today and start your path to success.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

