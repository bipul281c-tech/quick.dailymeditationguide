import { AmbientBackground } from "@/components/ambient-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Daily Meditation Guide collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-4xl mx-auto">
                <article className="blur-reveal">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-12">
                        Last updated: December 8, 2025
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Welcome to Daily Meditation Guide. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We collect information that you voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Register for an account on our website</li>
                                <li>Contact us through our contact form</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Use our meditation and audio features</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Automatic Information Collection</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                When you visit our website, we automatically collect certain information including:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Device and browser information</li>
                                <li>IP address and location data</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website addresses</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Tracking Technologies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We may use third-party services that collect, monitor, and analyze data to improve our service:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li><strong>Google Analytics</strong> - for website traffic analysis and user behavior insights</li>
                                <li><strong>Google AdSense</strong> - for displaying personalized advertisements</li>
                                <li><strong>Vercel Analytics</strong> - for performance monitoring and optimization</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                These third-party service providers have their own privacy policies addressing how they use such information. We encourage you to read their privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Provide, operate, and maintain our website</li>
                                <li>Improve, personalize, and expand our services</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Communicate with you for customer service and updates</li>
                                <li>Send you newsletters and promotional materials (with your consent)</li>
                                <li>Display relevant advertisements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Privacy Rights</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Depending on your location, you may have certain rights regarding your personal information:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>The right to access your personal data</li>
                                <li>The right to correct inaccurate data</li>
                                <li>The right to request deletion of your data</li>
                                <li>The right to restrict or object to data processing</li>
                                <li>The right to data portability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Children&apos;s Privacy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:{" "}
                                <a href="/contact" className="text-primary hover:text-primary/80 transition-colors underline">
                                    our contact page
                                </a>
                            </p>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    )
}
