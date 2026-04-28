import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white/90 font-sans selection:bg-violet-500/30 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 py-6 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-400" />
            <span className="text-lg font-bold tracking-tighter">QUES PRIVACY</span>
          </div>
          <div className="w-24 md:block hidden" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-white/40 mb-12 font-mono text-sm">Effective Date: March 1, 2026</p>

          <div className="glass p-8 md:p-12 rounded-[40px] border-white/10 space-y-12 leading-relaxed text-white/70">
            <section>
              <p className="text-lg">
                CURIOSITY APP LABS INC. (“Company,” “we,” “us,” or “our”) operates Ques (the “App” and “Services”), an audio-first platform for creators and listeners.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, and disclose information when you use the Ques mobile application, website, and related services. By using the Services, you agree to this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">1. Information We Collect</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-3">A. Information You Provide</h3>
                  <p className="mb-4">When you create an account or use Ques, we may collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email address</li>
                    <li>Username</li>
                    <li>Profile information (bio, avatar, preferences)</li>
                    <li>Audio content you upload</li>
                    <li>Messages and interactions within the App</li>
                    <li>Customer support communications</li>
                  </ul>
                  <p className="mt-4">If you are a creator, we may also collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Subscription pricing settings</li>
                    <li>Payout information (processed through secure third-party providers)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-3">B. Information Collected Automatically</h3>
                  <p className="mb-4">When you use the App, we may automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device type and operating system</li>
                    <li>IP address</li>
                    <li>App usage data</li>
                    <li>Playback activity</li>
                    <li>Engagement metrics</li>
                    <li>Crash logs and diagnostic data</li>
                  </ul>
                  <p className="mt-4">This information helps us maintain security, improve functionality, and personalize the user experience.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white/90 mb-3">C. Payment Information</h3>
                  <p className="mb-4">If you make purchases through Ques:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payments are processed through Apple In-App Purchases or other authorized payment providers.</li>
                    <li>We do not store full credit card information.</li>
                    <li>We may receive transaction confirmations and related identifiers.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">2. How We Use Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain the Services</li>
                <li>Create and manage user accounts</li>
                <li>Enable subscriptions and monetization</li>
                <li>Personalize content recommendations</li>
                <li>Process transactions</li>
                <li>Respond to support inquiries</li>
                <li>Improve app performance and security</li>
                <li>Enforce our Terms and Community Guidelines</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-6 font-bold text-violet-400">We do not sell personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">3. Cookies and Analytics</h2>
              <p>Our website (www.getques.com) may use essential cookies and analytics tools. Within the App, we may use analytics tools to understand usage and improve performance. If advertising identifiers are used in the future, they will comply with Apple’s App Tracking Transparency requirements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">4. Sharing of Information</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-white/90 mb-2">Service Providers</h4>
                  <p>Such as cloud hosting providers, payment processors, analytics services, and security vendors. These providers process data on our behalf.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white/90 mb-2">Legal Requirements</h4>
                  <p>If required to comply with applicable laws, legal processes, or to protect rights and safety.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white/90 mb-2">Business Transfers</h4>
                  <p>In connection with a merger, acquisition, or restructuring.</p>
                </div>
              </div>
              <p className="mt-6 font-bold text-violet-400">We do not sell personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">5. Data Retention</h2>
              <p>We retain personal information while your account is active, as needed to provide the Services, as required by law, and to resolve disputes and enforce agreements. When no longer necessary, information is securely deleted or anonymized.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">6. Your Rights</h2>
              <p className="mb-4">Depending on your jurisdiction, you may have rights to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent where applicable</li>
              </ul>
              <p className="mt-6">To exercise your rights, contact: <a href="mailto:privacy@getques.com" className="text-violet-400 hover:underline">privacy@getques.com</a></p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">7. Children’s Privacy</h2>
              <p>Ques is intended for individuals 18 years of age or older. We do not knowingly collect personal information from minors. If we become aware that such information has been collected, we will delete it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">8. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards designed to protect personal information. However, no system can guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">9. Apple App Store Disclosure</h2>
              <p>If you download Ques through the Apple App Store, Apple may collect certain data under its own privacy policy. In-app purchases are processed by Apple. Our App Store privacy disclosures will reflect this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. If material changes are made, we will update the Effective Date and provide notice where required.</p>
            </section>

            <section className="pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">11. Contact Us</h2>
              <div className="space-y-2">
                <p className="font-bold text-white">CURIOSITY APP LABS INC.</p>
                <p>Website: <a href="https://www.getques.com" className="text-violet-400 hover:underline">www.getques.com</a></p>
                <p>Email: <a href="mailto:privacy@getques.com" className="text-violet-400 hover:underline">privacy@getques.com</a></p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
