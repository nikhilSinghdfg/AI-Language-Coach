"use client";

import React from 'react'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SideBar from '../../components/Layout/SideBar';
import { useAppContext } from '../../Context/UserContext.js';


function Dashboard() {

  const { isLogin } = useAppContext();

  return (
    <div className="flex">

      {/* Show Sidebar only if user is logged in */}
      {isLogin && <SideBar />}

      <div className="flex-1 flex flex-col">
        <Header />


        {isLogin ?
          (
            <>
              <main className={`mt-16 w-full h-screen p-4 pl-64 `}>
                <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
                  <section className="flex flex-col-reverse lg:flex-row items-center gap-16">
                    {/* Text Section */}
                    <div
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-offset="200"
                      className="lg:w-1/2 text-center lg:text-left"
                    >
                      <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 leading-tight tracking-tight">
                        Improve Your Language Skills with{" "}
                        <span className=" from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                          AI-Powered Conversations
                        </span>
                      </h2>
                      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        TALKNEST, AI helps you practice and enhance your language skills
                        through natural, interactive conversations powered by advanced AI
                        technology.
                      </p>
                      <div
                        className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                        data-aos="zoom-in"
                        data-aos-duration="500"
                      >

                      </div>
                    </div>

                    {/* Image Section */}
                    <div
                      data-aos="zoom-in"
                      data-aos-duration="700"
                      className="lg:w-1/2 max-w-lg"
                    >
                      <img
                        alt="AI chatbot conversation illustration"
                        className="w-full rounded-2xl shadow-xl"
                        height="400"
                        src="https://storage.googleapis.com/a1aa/image/291a9f11-bc09-45bb-ab4b-6d16357b13b0.jpg"
                        width="600"
                      />
                    </div>
                  </section>

                  {/* FEATURES */}
                  <section
                    className="mt-24 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center"
                    id="features"
                  >
                    {[
                      {
                        icon: "🤖",
                        title: "AI-Powered Conversations",
                        desc: "Engage in realistic dialogues with our AI to practice speaking and comprehension.",
                      },
                      {
                        icon: "💬",
                        title: "Real-Time Feedback",
                        desc: "Receive instant suggestions and corrections to improve grammar and pronunciation.",
                      },
                      {
                        icon: "📈",
                        title: "Progress Tracking",
                        desc: "Monitor your journey with detailed analytics and personalized goals.",
                      },
                      {
                        icon: "🌍",
                        title: "Multi-Language Support",
                        desc: "Practice English, French, Japanese, and more with ease.",
                      },
                      {
                        icon: "📱",
                        title: "Mobile Friendly",
                        desc: "Use LangAdvisor AI on any device, anytime, anywhere.",
                      },
                      {
                        icon: "🛡️",
                        title: "Privacy & Security",
                        desc: "Your data stays safe — we never share it without consent.",
                      },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        data-aos-duration="600"
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </section>

                  {/* HOW IT WORKS */}
                  <section className="mt-24 max-w-4xl mx-auto text-center" id="how-it-works">
                    <h2 data-aos="fade-up" className="text-3xl font-extrabold text-indigo-600 mb-12">
                      How It Works
                    </h2>
                    <div className="space-y-12">
                      {[
                        {
                          title: "Start a Conversation",
                          desc: "Begin chatting with AI in your target language. It understands context and responds naturally.",
                          img: "https://storage.googleapis.com/a1aa/image/78d25fa4-1d74-409d-db9b-2405522678ae.jpg",
                        },
                        {
                          title: "Receive Instant Feedback",
                          desc: "Get real-time corrections and tips to improve your language skills as you chat.",
                          img: "https://storage.googleapis.com/a1aa/image/8efdf063-fb30-42f4-ade5-bbe961c276cd.jpg",
                          reverse: true,
                        },
                        {
                          title: "Track Your Progress",
                          desc: "Review your learning stats and set goals to stay motivated and improve faster.",
                          img: "https://storage.googleapis.com/a1aa/image/89f2094d-88c2-48ff-1932-b49c5a99bac7.jpg",
                        },
                      ].map((step, i) => (
                        <div
                          key={i}
                          data-aos="fade-up"
                          data-aos-delay={i * 200}
                          data-aos-duration="700"
                          className={`flex flex-col sm:flex-row items-center gap-10 ${step.reverse ? "sm:flex-row-reverse" : ""
                            }`}
                        >
                          <div className="sm:w-1/3">
                            <img
                              src={step.img}
                              alt={step.title}
                              className="mx-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                              width="250"
                              height="250"
                            />
                          </div>
                          <div className="sm:w-2/3 text-left">
                            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                              {step.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </main>


              </main>
            </>
          )
          :
          (
            <>
              <main className={`mt-16 w-full h-screen p-4 `}>

                <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
                  <section className="flex flex-col-reverse lg:flex-row items-center gap-16">
                    {/* Text Section */}
                    <div
                      data-aos="fade-up"
                      data-aos-duration="600"
                      data-aos-offset="200"
                      className="lg:w-1/2 text-center lg:text-left"
                    >
                      <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 leading-tight tracking-tight">
                        Improve Your Language Skills with{" "}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                          AI-Powered Conversations
                        </span>
                      </h2>
                      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        TALKNEST, AI helps you practice and enhance your language skills
                        through natural, interactive conversations powered by advanced AI
                        technology.
                      </p>
                      <div
                        className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                        data-aos="zoom-in"
                        data-aos-duration="500"
                      >

                      </div>
                    </div>

                    {/* Image Section */}
                    <div
                      data-aos="zoom-in"
                      data-aos-duration="700"
                      className="lg:w-1/2 max-w-lg"
                    >
                      <img
                        alt="AI chatbot conversation illustration"
                        className="w-full rounded-2xl shadow-xl"
                        height="400"
                        src="https://storage.googleapis.com/a1aa/image/291a9f11-bc09-45bb-ab4b-6d16357b13b0.jpg"
                        width="600"
                      />
                    </div>
                  </section>

                  {/* FEATURES */}
                  <section
                    className="mt-24 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center"
                    id="features"
                  >
                    {[
                      {
                        icon: "🤖",
                        title: "AI-Powered Conversations",
                        desc: "Engage in realistic dialogues with our AI to practice speaking and comprehension.",
                      },
                      {
                        icon: "💬",
                        title: "Real-Time Feedback",
                        desc: "Receive instant suggestions and corrections to improve grammar and pronunciation.",
                      },
                      {
                        icon: "📈",
                        title: "Progress Tracking",
                        desc: "Monitor your journey with detailed analytics and personalized goals.",
                      },
                      {
                        icon: "🌍",
                        title: "Multi-Language Support",
                        desc: "Practice English, French, Japanese, and more with ease.",
                      },
                      {
                        icon: "📱",
                        title: "Mobile Friendly",
                        desc: "Use LangAdvisor AI on any device, anytime, anywhere.",
                      },
                      {
                        icon: "🛡️",
                        title: "Privacy & Security",
                        desc: "Your data stays safe — we never share it without consent.",
                      },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        data-aos="fade-up"
                        data-aos-delay={i * 100}
                        data-aos-duration="600"
                        className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </section>

                  {/* HOW IT WORKS */}
                  <section className="mt-24 max-w-4xl mx-auto text-center" id="how-it-works">
                    <h2 data-aos="fade-up" className="text-3xl font-extrabold text-indigo-600 mb-12">
                      How It Works
                    </h2>
                    <div className="space-y-12">
                      {[
                        {
                          title: "Start a Conversation",
                          desc: "Begin chatting with AI in your target language. It understands context and responds naturally.",
                          img: "https://storage.googleapis.com/a1aa/image/78d25fa4-1d74-409d-db9b-2405522678ae.jpg",
                        },
                        {
                          title: "Receive Instant Feedback",
                          desc: "Get real-time corrections and tips to improve your language skills as you chat.",
                          img: "https://storage.googleapis.com/a1aa/image/8efdf063-fb30-42f4-ade5-bbe961c276cd.jpg",
                          reverse: true,
                        },
                        {
                          title: "Track Your Progress",
                          desc: "Review your learning stats and set goals to stay motivated and improve faster.",
                          img: "https://storage.googleapis.com/a1aa/image/89f2094d-88c2-48ff-1932-b49c5a99bac7.jpg",
                        },
                      ].map((step, i) => (
                        <div
                          key={i}
                          data-aos="fade-up"
                          data-aos-delay={i * 200}
                          data-aos-duration="700"
                          className={`flex flex-col sm:flex-row items-center gap-10 ${step.reverse ? "sm:flex-row-reverse" : ""
                            }`}
                        >
                          <div className="sm:w-1/3">
                            <img
                              src={step.img}
                              alt={step.title}
                              className="mx-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                              width="250"
                              height="250"
                            />
                          </div>
                          <div className="sm:w-2/3 text-left">
                            <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                              {step.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </main>

              </main>
            </>
          )}


        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
