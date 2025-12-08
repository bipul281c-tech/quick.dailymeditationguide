import { AmbientBackground } from "@/components/ambient-background"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Disclaimer",
    description: "Important disclaimers regarding the use of Daily Meditation Guide content and services.",
}

export default function DisclaimerPage() {
    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-4xl mx-auto">
                <article className="blur-reveal">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Disclaimer
                    </h1>
                    <p className="text-muted-foreground mb-12">
                        Last updated: December 8, 2025
                    </p>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">General Information</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The information provided by Daily Meditation Guide (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                            </p>
                        </section>

                        <section className="bg-secondary/20 border border-secondary/30 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">⚕️ Not Medical Advice</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                <strong>The content on this website, including meditation guides, sleep stories, and relaxation techniques, is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment.</strong> Always seek the advice of your physician, mental health professional, or other qualified health provider with any questions you may have regarding a medical condition or mental health concerns.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Never disregard professional medical advice or delay in seeking it because of something you have read or heard on this website. If you think you may have a medical emergency, call your doctor, go to the emergency department, or call emergency services immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Mental Health Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our meditation and relaxation content is designed to support general wellness and stress reduction. However, it is not a replacement for professional mental health treatment. If you are experiencing severe anxiety, depression, or other mental health conditions, please consult with a licensed mental health professional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Use at Your Own Risk</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Please do not practice meditation or listen to sleep stories while driving, operating machinery, or engaged in any activity requiring your full attention.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">External Links Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                This website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Advertising Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                This website may contain advertisements and promotional content provided by third-party advertisers, including Google AdSense. We do not endorse, guarantee, or assume responsibility for the accuracy, completeness, or usefulness of any advertisement or promotional material. Any reliance you place on such information is strictly at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Information</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                While we strive to keep the information on our website accurate and up-to-date, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">No Professional Relationship</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Use of this website does not create a professional-client relationship between you and Daily Meditation Guide. The content provided is not personalized advice and should not be treated as such.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We reserve the right to make changes to this disclaimer at any time without notice. It is your responsibility to review this page periodically to stay informed of updates.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Disclaimer, please contact us at:{" "}
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
