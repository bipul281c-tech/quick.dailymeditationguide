import { AmbientBackground } from "@/components/ambient-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the terms and conditions for using Daily Meditation Guide services. Understand your rights and responsibilities.",
    openGraph: {
        title: "Terms of Service | Daily Meditation Guide",
        description: "Read the terms and conditions for using Daily Meditation Guide services.",
        url: "https://www.quick.dailymeditationguide.com/terms",
        siteName: "Daily Meditation Guide",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Terms of Service | Daily Meditation Guide",
        description: "Terms and conditions for using Daily Meditation Guide.",
    },
    alternates: {
        canonical: "https://www.quick.dailymeditationguide.com/terms",
    },
}


export default function TermsPage() {
    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-4xl mx-auto">
                <article className="blur-reveal">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-12">
                        Last updated: December 8, 2025
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing or using Daily Meditation Guide, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Use License</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Permission is granted to temporarily access the materials (information, audio content, and meditations) on Daily Meditation Guide for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or public display</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or mirror the materials on any other server</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">User Accounts</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Maintaining the confidentiality of your account and password</li>
                                <li>Restricting access to your computer or device</li>
                                <li>All activities that occur under your account</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The content on Daily Meditation Guide, including but not limited to text, graphics, logos, audio files, meditation content, and software, is the property of Daily Meditation Guide or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">User Conduct</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                You agree not to use the website to:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe the intellectual property rights of others</li>
                                <li>Transmit any harmful, threatening, or offensive content</li>
                                <li>Interfere with or disrupt the website or servers</li>
                                <li>Attempt to gain unauthorized access to any portion of the website</li>
                                <li>Collect or harvest any user data without proper authorization</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Content Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The meditation and relaxation content provided on this website is for general wellness purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In no event shall Daily Meditation Guide or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Daily Meditation Guide has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You agree to indemnify, defend, and hold harmless Daily Meditation Guide and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney fees, arising out of your violation of these Terms or your use of the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Links</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our website may contain links to third-party websites or services that are not owned or controlled by Daily Meditation Guide. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We may terminate or suspend your account and access to the website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will cease immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Daily Meditation Guide operates, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about these Terms, please contact us at:{" "}
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
