import { AmbientBackground } from "@/components/ambient-background"
import { Heart, Headphones, Moon, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Daily Meditation Guide - your sanctuary for mindfulness, guided meditations, and peaceful sleep stories.",
}

const features = [
    {
        icon: Headphones,
        title: "Guided Meditations",
        description: "Expertly crafted audio sessions designed to help you relax, focus, and find inner peace.",
    },
    {
        icon: Moon,
        title: "Sleep Stories",
        description: "Soothing narratives that gently guide you into a restful, rejuvenating sleep.",
    },
    {
        icon: Heart,
        title: "Mindfulness Exercises",
        description: "Simple yet powerful practices to bring awareness and calm to your everyday life.",
    },
    {
        icon: Sparkles,
        title: "Ambient Soundscapes",
        description: "Immersive audio environments that create the perfect backdrop for relaxation.",
    },
]

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-4xl mx-auto">
                <article className="blur-reveal">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        About Daily Meditation Guide
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                        Your sanctuary for mindfulness, inner peace, and restful sleep.
                    </p>

                    <div className="space-y-12">
                        {/* Mission Section */}
                        <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                At Daily Meditation Guide, we believe that everyone deserves a moment of peace in their busy lives. Our mission is to make mindfulness and meditation accessible to all, providing a gentle sanctuary where you can reconnect with yourself and find balance.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                In today&apos;s fast-paced world, stress and anxiety have become constant companions for many. We&apos;re here to change that narrative—one breath at a time. Through carefully curated audio experiences, we guide you toward a calmer, more centered version of yourself.
                            </p>
                        </section>

                        {/* What We Offer */}
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-8">What We Offer</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {features.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                            <feature.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Our Story */}
                        <section className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Daily Meditation Guide was born from a simple observation: in our hyper-connected world, true moments of stillness have become rare treasures. We set out to create a digital space that feels like a warm embrace—a place where technology serves your wellbeing rather than competing for your attention.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Each meditation, sleep story, and soundscape in our library has been thoughtfully crafted with love and intention. We draw inspiration from ancient wisdom traditions while embracing modern understanding of the mind-body connection.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Whether you&apos;re taking your first steps into meditation or you&apos;re a seasoned practitioner, we&apos;re honored to be part of your wellness journey.
                            </p>
                        </section>

                        {/* Our Values */}
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Accessibility</h3>
                                        <p className="text-muted-foreground text-sm">Meditation should be available to everyone, regardless of experience or background.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Quality</h3>
                                        <p className="text-muted-foreground text-sm">Every piece of content is crafted with care, attention to detail, and genuine intention to help.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Sustainability</h3>
                                        <p className="text-muted-foreground text-sm">We&apos;re committed to practices that nurture both individual wellbeing and our planet.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Community</h3>
                                        <p className="text-muted-foreground text-sm">Building a supportive community of mindful individuals who lift each other up.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="text-center py-8">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Begin Your Journey?</h2>
                            <p className="text-muted-foreground mb-6">
                                Explore our library of meditations and find your moment of peace today.
                            </p>
                            <a
                                href="/library"
                                className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                            >
                                Explore Library
                            </a>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    )
}
