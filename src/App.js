
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Code, Mail, Linkedin, Github, Twitter, Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

const projectData = [
    {
        id: 1,
        title: "AI-Powered SaaS Platform",
        description: "A comprehensive enterprise solution leveraging machine learning to automate business intelligence and data analytics.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        tags: ["React", "Node.js", "Python", "AWS"],
    },
    {
        id: 2,
        title: "Mobile E-Commerce App",
        description: "A cross-platform mobile application for a seamless shopping experience with AR-powered product previews.",
        imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        tags: ["React Native", "Firebase", "Stripe"],
    },
    {
        id: 3,
        title: "Interactive Data Visualization",
        description: "A web-based tool for visualizing complex scientific data, featuring real-time updates and custom charting.",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        tags: ["D3.js", "React", "WebSocket"],
    },
];

const socialLinks = [
    { icon: Github, href: "#", name: "GitHub" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Twitter, href: "#", name: "Twitter" },
];

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.setAttribute('data-visible', 'true');
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <div ref={ref} className="transition-all duration-1000 ease-in-out opacity-0 translate-y-8 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0">
            {children}
        </div>
    );
};

export default function PortfolioPage() {
    const [activeSection, setActiveSection] = useState('about');
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

    const sectionRefs = {
        about: useRef(null),
        projects: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('sending');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // This is a mock success. In a real app, you'd handle potential errors.
            if (formState.name && formState.email && formState.message) {
              setFormStatus('success');
              setFormState({ name: '', email: '', message: '' });
            } else {
              throw new Error("Validation failed");
            }

        } catch (error) {
            setFormStatus('error');
        } finally {
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };
    
    const renderFormButton = useCallback(() => {
        switch (formStatus) {
            case 'sending':
                return (
                    <button type="submit" disabled className="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-slate-900 bg-[#CCFF00] opacity-70 cursor-not-allowed">
                        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Sending...
                    </button>
                );
            case 'success':
                return (
                    <div className="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-emerald-900 bg-emerald-300">
                        <CheckCircle className="-ml-1 mr-3 h-5 w-5" />
                        Message Sent!
                    </div>
                );
            case 'error':
                return (
                    <div className="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-rose-900 bg-rose-300">
                        <AlertTriangle className="-ml-1 mr-3 h-5 w-5" />
                        Something went wrong.
                    </div>
                );
            default:
                return (
                    <button type="submit" className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-slate-900 bg-[#CCFF00] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CCFF00] focus:ring-offset-slate-900 transition-colors">
                        Send Message
                    </button>
                );
        }
    }, [formStatus]);

    return (
        <div className="bg-slate-950 text-slate-300 font-sans leading-relaxed antialiased selection:bg-[#CCFF00] selection:text-slate-900">
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="#about" className="flex-shrink-0 flex items-center space-x-2">
                                <Code className="h-8 w-8 text-[#CCFF00]" />
                                <span className="text-xl font-bold text-white">John Doe</span>
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            activeSection === link.href.substring(1)
                                                ? 'bg-[#CCFF00] text-slate-900'
                                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="pt-16">
                <section id="about" ref={sectionRefs.about} className="min-h-screen flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <AnimatedSection>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                                    Hi, I'm John Doe.
                                    <span className="block text-3xl sm:text-4xl lg:text-5xl text-[#CCFF00] mt-2">A Creative Full-Stack Developer.</span>
                                </h1>
                                <p className="mt-6 text-lg text-slate-400 max-w-xl">
                                    I specialize in building exceptional, high-quality websites and applications. With a passion for clean code and user-centric design, I transform complex problems into elegant, intuitive digital solutions.
                                </p>
                                <div className="mt-8 flex items-center space-x-4">
                                    <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-[#CCFF00] hover:bg-opacity-80 transition-colors">
                                        Get in Touch
                                    </a>
                                    <div className="flex space-x-4">
                                        {socialLinks.map((link) => (
                                            <a key={link.name} href={link.href} className="text-slate-400 hover:text-[#CCFF00] transition-colors" aria-label={link.name}>
                                                <link.icon className="h-6 w-6" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#CCFF00] animate-spin-slow"></div>
                                    <img 
                                        className="relative w-full h-full object-cover rounded-full shadow-2xl shadow-[#ccff00]/10" 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                        alt="Professional portrait of John Doe" 
                                    />
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>

                <section id="projects" ref={sectionRefs.projects} className="py-24 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="text-center">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">My Portfolio</h2>
                                <p className="mt-4 text-lg text-slate-400">A selection of my best work. Each project is a unique piece of development.</p>
                            </div>
                        </AnimatedSection>
                        <div className="mt-12 space-y-16">
                            {projectData.map((project) => (
                                <AnimatedSection key={project.id}>
                                    <div className="group relative overflow-hidden rounded-lg shadow-lg shadow-black/30">
                                        <img src={project.imageUrl} alt={project.title} className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                                            <p className="mt-2 text-lg text-slate-200 max-w-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">{project.description}</p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 text-xs font-semibold text-slate-900 bg-[#CCFF00] rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                            <a href="#" className="absolute inset-0" aria-label={`View project: ${project.title}`}>
                                                <span className="sr-only">View project</span>
                                            </a>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" ref={sectionRefs.contact} className="py-24">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatedSection>
                            <div className="text-center">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Build Something Amazing</h2>
                                <p className="mt-4 text-lg text-slate-400">Have a project in mind? I'd love to hear from you. Fill out the form below.</p>
                            </div>
                            <div className="mt-12">
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Full name</label>
                                        <input type="text" name="name" id="name" autoComplete="name" value={formState.name} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-800 border-slate-700 rounded-md focus:ring-[#CCFF00] focus:border-[#CCFF00]" placeholder="Full name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input id="email" name="email" type="email" autoComplete="email" value={formState.email} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-800 border-slate-700 rounded-md focus:ring-[#CCFF00] focus:border-[#CCFF00]" placeholder="Email address" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea id="message" name="message" rows={4} value={formState.message} onChange={handleInputChange} required className="block w-full shadow-sm py-3 px-4 placeholder-slate-500 bg-slate-800 border-slate-700 rounded-md focus:ring-[#CCFF00] focus:border-[#CCFF00]" placeholder="Your message..."></textarea>
                                    </div>
                                    <div>
                                        {renderFormButton()}
                                    </div>
                                </form>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>
            <footer className="bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
