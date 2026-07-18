import { useState } from 'react';
import { Award, Users, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const previousEditions = [
    {
      year: '2025',
      location: 'BSE India, Mumbai',
      theme: 'Scaling Circular Green Economies',
      desc: 'Partnered with central sustainability chambers, felicitating 85+ green pioneers with national broadcast coverage.',
    },
    {
      year: '2024',
      location: 'AMA Ahmedabad',
      theme: 'MSME & Grassroots Green Tech',
      desc: 'Brought together 400+ delegates in Gujarat, focusing heavily on retail green product lines and green manufacturing practices.',
    },
    {
      year: '2023',
      location: 'CEE (Centre for Environment Education), Ahmedabad',
      theme: 'Climate Action & Sustainable Habitats',
      desc: 'Aligned directly with national environmental educators, evaluating innovations in eco-tourism and organic farming.',
    },
    {
      year: '2022',
      location: 'VyapaarJagat Digital Conclave',
      theme: 'Post-Pandemic Green Turnaround',
      desc: 'An intensive virtual convention celebrating resource resilience, green supply chain shifts, and early waste startups.',
    },
  ];

  return (
    <div className="bg-cream-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-dark-green text-pure-white py-24 px-6 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&w=1920&q=80&fit=crop"
            alt="Forest Mountains Landscape"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-green/90 via-dark-green to-dark-green"></div>
          <div className="absolute inset-0 heritage-ornament opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Our Ancestry
          </div>
          <h1 className="text-4xl sm:text-6xl font-playfair font-bold mb-6">
            The Chronicle of Golden Preneur
          </h1>
          <p className="text-pure-white/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Five years of honoring, elevating, and scaling the visionaries who place ecological integrity at the core of industrial growth.
          </p>
        </div>
      </section>

      {/* CORE STATS BANNER */}
      <section className="py-8 bg-pure-white border-y border-light-grey">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-playfair font-bold text-accent-gold">5th</span>
            <span className="text-[10px] text-medium-grey font-bold uppercase tracking-widest mt-1 block">
              Annual Edition
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-playfair font-bold text-primary-green">1,000+</span>
            <span className="text-[10px] text-medium-grey font-bold uppercase tracking-widest mt-1 block">
              Stories Published
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-playfair font-bold text-accent-gold">150+</span>
            <span className="text-[10px] text-medium-grey font-bold uppercase tracking-widest mt-1 block">
              Sectors Vetted
            </span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-playfair font-bold text-primary-green">5,000+</span>
            <span className="text-[10px] text-medium-grey font-bold uppercase tracking-widest mt-1 block">
              Community Members
            </span>
          </div>
        </div>
      </section>

      {/* THE VISION & ORGANIZERS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Main Context */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-accent-gold font-bold uppercase tracking-[0.3em] text-[10px] block">
              The Vanguard
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-dark-green leading-tight">
              A Sovereign Alliance for Ecological Restoration
            </h2>
            <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
              Golden preneur is a prestige covenant—an elite circle of visionaries who merge industrial performance with systemic ecological restoration. In 2026, we celebrate our <strong>5th year anniversary celebration</strong> at the Renaissance by Marriott Ahmedabad Hotel.
            </p>
            <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
              Traditional benchmarks honor financial scale while discounting systemic environmental debt. Golden preneur exists to celebrate resource productivity and circular integrity, validated through an rigorous, double-blind jury adjudication.
            </p>
            <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
              Over the years, we have brought together innovators in waste management, renewable fuels, organic farming, sustainable textiles, and electric vehicles, creating opportunities for them to meet investors, corporate buyers, and policymakers.
            </p>

            {/* SDG list */}
            <div className="bg-pure-white p-6 rounded-xl border border-light-grey mt-8">
              <h4 className="font-bold text-dark-green text-base mb-3">Our Core Objectives:</h4>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span><strong>Celebrate Excellence:</strong> Felicitating those who demonstrate measurable environmental stewardship.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-primary-green shrink-0 mt-0.5" />
                  <span><strong>Build Networks:</strong> Bridging the gap between green MSMEs and corporate ESG buying teams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  <span><strong>Amplify Voice:</strong> Generating national visibility for sustainability stories via VyapaarJagat.com.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Organizer Cards */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* NGO info */}
            <div className="bg-pure-white p-8 rounded-xl border border-light-grey shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-green text-pure-white rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-green text-lg">MEIF</h3>
                  <span className="text-[10px] text-accent-gold font-bold uppercase tracking-wider">
                    NGO Organizer
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                <strong>1 Million Entrepreneurs International Forum (MEIF)</strong> is a registered Section 8 Company in India (NGO) with active <strong>80G & 12A</strong> certifications. They are fully certified under CSR (CSR00106194) and NITI Aayog Darpan to implement impactful national development initiatives.
              </p>
              <div className="text-[10px] border-t border-light-grey pt-3 text-medium-grey flex justify-between">
                <span>PAN: AACCZ1279M</span>
                <span>Founding Dir: Dr. Pravin Parmar</span>
              </div>
            </div>

            {/* Media Partner Info */}
            <div className="bg-pure-white p-8 rounded-xl border border-light-grey shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-dark-green text-pure-white rounded-lg flex items-center justify-center">
                  <Globe className="w-7 h-7 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-green text-lg">VyapaarJagat.com</h3>
                  <span className="text-[10px] text-primary-green font-bold uppercase tracking-wider">
                    Media & Tech Partner
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                VyapaarJagat.com is one of India's leading business platforms documenting entrepreneur stories. It serves as the primary media engine for Golden preneur, archiving and publishing editorial features on sustainable businesses to drive organic growth.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* TIMELINE OF PREVIOUS EDITIONS */}
      <section className="py-24 bg-pure-white border-y border-light-grey">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-dark-green">
              Chronicles of Sustainability
            </h2>
            <p className="text-xs sm:text-sm text-medium-grey max-w-xl mx-auto mt-2 font-light">
              Golden preneur has travelled across key institutional backings, celebrating changes in diverse business centers.
            </p>
          </div>

          {/* Animated Timeline Thread (horizontal on large screens, vertical on mobile) */}
          <div className="relative max-w-6xl mx-auto py-10">
            {/* Thread line */}
            <div className="absolute top-[48px] left-[15px] lg:left-0 right-[15px] lg:right-0 h-0.5 bg-gradient-to-r from-[#B38728] via-[#0B5B3E] to-[#B38728] hidden lg:block opacity-30"></div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10"
            >
              {previousEditions.map((ed, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-pure-white p-6 border border-light-grey rounded-2xl relative group hover:border-[#B38728]/45 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Glowing Node on Timeline Thread */}
                  <div className="absolute -top-[16px] left-6 w-8 h-8 rounded-full bg-cream-white border-2 border-accent-gold flex items-center justify-center hidden lg:flex shadow-md group-hover:bg-[#B38728] transition-colors duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#B38728] group-hover:bg-pure-white transition-colors duration-300"></div>
                  </div>

                  <span className="block text-4xl font-playfair font-black text-accent-gold mb-3 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                    {ed.year}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-primary-green tracking-widest block mb-2">
                    {ed.location}
                  </span>
                  <h4 className="font-bold text-sm text-dark-green mb-3 group-hover:text-primary-green transition-colors">{ed.theme}</h4>
                  <p className="text-xs text-medium-grey leading-relaxed font-light mt-auto">{ed.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP / FOUNDER MESSAGE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-dark-green text-pure-white rounded-3xl overflow-hidden shadow-2xl relative border border-pure-white/10 min-h-[500px] flex items-center justify-center">
          {/* Cinematic Looped Background Video with Blur & Overlays */}
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-60 filter blur-[1px] scale-[1.02]"
            >
              <source src="/hardik-conclave.mp4" type="video/mp4" />
            </video>
            {/* Elegant vignette overlay: clear center, fading to dark green edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#052216_85%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#052216]/10 to-[#052216]/40"></div>
          </div>
          
          <motion.div 
            layout 
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="p-4 sm:p-16 relative z-10 flex flex-col items-center justify-center text-center w-full"
          >
            {!isProfileExpanded ? (
              // Initial State: Trendy 3D-effect VIP Card Cover
              <motion.div 
                layoutId="profile-card"
                onClick={() => setIsProfileExpanded(true)}
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: -5,
                  boxShadow: "0px 25px 50px rgba(179, 135, 40, 0.25)"
                }}
                className="cursor-pointer group relative w-full max-w-[250px] sm:w-72 h-[430px] rounded-3xl overflow-hidden border border-gold-metallic/35 bg-[#062216] shadow-2xl flex flex-col justify-between p-6 transition-all duration-300"
                style={{ perspective: 1000 }}
              >
                {/* Glowing neon aura behind */}
                <div className="absolute -inset-10 bg-gradient-to-br from-[#B38728]/15 via-[#0B5B3E]/10 to-transparent blur-2xl group-hover:opacity-100 transition-all duration-500"></div>

                {/* Top Corner Badge */}
                <div className="relative z-10 flex justify-between items-center w-full">
                  <span className="bg-gold-metallic/20 text-[#FCF6BA] border border-gold-metallic/35 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                    Developer Pass
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse"></div>
                </div>

                {/* Portrait Photo covering the card center with luxury gold frame */}
                <div className="relative z-10 my-auto flex justify-center">
                  <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-gold-metallic group-hover:border-accent-gold transition-colors duration-500 shadow-xl">
                    <img
                      src="/hardik.jpg"
                      alt="Hardik Parmar"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Golden luxury overlay mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#052216]/80 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Bottom branding and interact CTA */}
                <div className="relative z-10 text-center w-full">
                  <h3 className="font-playfair text-xl font-black text-pure-white tracking-wide">
                    Hardik Parmar
                  </h3>
                  <p className="text-[#B38728] text-[9px] uppercase tracking-widest font-black mt-1">
                    Laravel • WordPress • Zoho Developer
                  </p>
                  
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-bold text-pure-white/60 group-hover:text-accent-gold transition-colors">
                    <span>Explore Profile & Vision</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Abstract geometric background lines */}
                <div className="absolute inset-0 border border-pure-white/5 rounded-3xl pointer-events-none m-2"></div>
              </motion.div>
            ) : (
              // Expanded State: Full bento-inspired description page
              <motion.div 
                layoutId="profile-card"
                className="grid lg:grid-cols-12 gap-8 text-left w-full relative"
              >


                {/* Left Bento: Photo card */}
                <div className="lg:col-span-4 bg-pure-white/5 border border-pure-white/10 p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#B38728]/10 blur-2xl"></div>
                  <div className="relative">
                    <div className="absolute -inset-2.5 border border-accent-gold/30 rounded-2xl"></div>
                    <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-gold-metallic shadow-xl">
                      <img
                        src="/hardik.jpg"
                        alt="Hardik Parmar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-pure-white mt-6 text-center">Hardik Parmar</h3>
                  <span className="text-[9px] font-bold text-[#B38728] uppercase tracking-widest mt-1 text-center">B.Tech Computer Engineering</span>
                </div>

                {/* Right Bento: Vision and Details */}
                <div className="lg:col-span-8 bg-pure-white/5 border border-pure-white/10 p-5 sm:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl">
                  <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-[#0B5B3E]/10 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <span className="text-accent-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">
                      Developer's Vision
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-playfair font-black text-pure-white mb-6">
                      Hardik Parmar
                    </h3>
                    <p className="text-pure-white/80 text-sm sm:text-base leading-relaxed mb-6 font-light italic">
                      "My vision is to bridge technology and business by developing secure, scalable, and user-focused digital solutions. As a Computer Engineering student at Silver Oak University, I specialize in Laravel, WordPress, and Zoho development, constantly enhancing my skills to build applications that create real value. I believe that innovation, continuous learning, and practical problem-solving are the foundation of a successful technology career."
                    </p>
                  </div>

                  <div className="relative z-10 border-t border-pure-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
                    <div className="flex flex-col text-xs text-pure-white/40 gap-1">
                      <span className="font-bold text-pure-white">Laravel • WordPress • Zoho Developer</span>
                      <span>Silver Oak University, Ahmedabad</span>
                    </div>
                    <button 
                      onClick={() => setIsProfileExpanded(false)}
                      className="px-4 py-2 border border-gold-metallic/35 text-gold-metallic hover:bg-gold-metallic hover:text-dark-green transition-all duration-300 text-[10px] font-black uppercase tracking-widest rounded-lg"
                    >
                      ← Collapse Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 bg-dark-green text-pure-white text-center relative overflow-hidden">
        <div className="absolute inset-0 lotus-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="font-playfair text-3xl font-bold mb-4 text-pure-white">
            Be part of the 5th Year Celebration Event.
          </h2>
          <p className="text-pure-white/80 text-sm mb-8 font-light max-w-lg mx-auto">
            Nominate your business for free or secure a delegate pass to network with 500+ green leaders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/awards/apply"
              className="btn-premium-primary px-8 py-3.5 text-xs"
            >
              Nominate Now (FREE)
            </Link>
            <Link
              to="/event-2026"
              className="btn-premium-secondary px-8 py-3.5 text-xs text-pure-white border-pure-white hover:text-dark-green"
            >
              Get Event Pass
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
