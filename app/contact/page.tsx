"use client"

import { useState } from "react"
import { AmbientBackground } from "@/components/ambient-background"
import { Mail, MessageSquare, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Message sent!",
            description: "Thank you for reaching out. We'll get back to you soon.",
        })

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        })
        setIsSubmitting(false)
    }

    return (
        <div className="bg-background text-foreground antialiased selection:bg-celadon-light selection:text-primary-foreground overflow-x-hidden relative min-h-screen">
            <AmbientBackground />

            <main className="pt-32 pb-24 px-6 relative min-h-screen max-w-4xl mx-auto">
                <div className="blur-reveal">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-medium text-foreground mb-2">Email Us</h3>
                            <p className="text-muted-foreground text-sm">support@dailymeditationguide.com</p>
                        </div>

                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-medium text-foreground mb-2">Feedback</h3>
                            <p className="text-muted-foreground text-sm">Your suggestions help us grow</p>
                        </div>

                        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-medium text-foreground mb-2">Response Time</h3>
                            <p className="text-muted-foreground text-sm">Within 24-48 hours</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                Subject
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors text-foreground"
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="feedback">Feedback & Suggestions</option>
                                <option value="technical">Technical Support</option>
                                <option value="partnership">Partnership Opportunities</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                                placeholder="How can we help you today?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
