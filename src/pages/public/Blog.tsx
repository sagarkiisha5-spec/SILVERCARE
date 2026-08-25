import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, ArrowRight, Clock, Calendar, MapPin, Tag, BookOpen, Heart, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import SEO from '@/src/components/seo/SEO';
import { initialBlogPosts, BlogPost } from '@/src/data/blogData';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const categories = [
  'All',
  'Success Stories',
  'Senior Health',
  'Caregiver Corner',
  'Healthcare Insights',
  'At-Home Care',
  'Healthy Ageing'
];

// Care Moments Gallery Images
const careMoments = [
  {
    title: 'Physiotherapy Support',
    category: 'Home Rehab',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800&fmt=webp'
  },
  {
    title: 'Senior Companionship',
    category: 'Daily Care',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800&fmt=webp'
  },
  {
    title: 'Doctor Home Consultation',
    category: 'Clinical Care',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800&fmt=webp'
  },
  {
    title: 'Registered Nursing Care',
    category: 'Medical Support',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800&fmt=webp'
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = initialBlogPosts.find(p => p.isFeatured) || initialBlogPosts[0];

  const filteredPosts = initialBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="SilverCare Stories & Healthcare Insights | Eldercare Blog"
        description="Discover inspiring senior success stories, caregiver guidance, home nursing tips, and expert healthcare perspectives across Gurgaon, Delhi NCR & North India."
      />

      <div className="flex flex-col font-sans bg-white text-slate-800">
        
        {/* 1. COMPACT EDITORIAL HERO */}
        <section className="relative pt-12 pb-16 bg-[#FAF5FF] border-b border-[#F5E8FF] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7B2CBF 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7B2CBF] font-extrabold text-xs uppercase tracking-wider mb-4">
                <Sparkles size={14} className="text-[#D946EF]" /> Stories • Care • Knowledge
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17345E] tracking-tight leading-tight mb-4">
                Stories that inspire. <br />
                <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF3E72,#7B2CBF,#9D4EDD)]">
                  Insights that care.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Discover meaningful SilverCare journeys, practical senior-health guidance, caregiver insights and healthcare perspectives from the communities we serve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. FEATURED STORY (60/40 EDITORIAL LAYOUT) */}
        {featuredPost && (
          <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="bg-[#FAF5FF] border border-[#EFE5F7] rounded-[32px] p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left 7 Cols: Image */}
                    <div className="lg:col-span-7 relative rounded-[24px] overflow-hidden group">
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        className="w-full h-[340px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#7B2CBF] font-extrabold text-xs shadow-sm">
                        <Sparkles size={13} /> Featured Story
                      </div>
                      {featuredPost.location && (
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17345E]/90 backdrop-blur-md text-white font-extrabold text-xs shadow-sm">
                          <MapPin size={13} className="text-[#FF4F81]" /> {featuredPost.location}
                        </div>
                      )}
                    </div>

                    {/* Right 5 Cols: Content */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-[#FF4F81] mb-3">
                        <span>{featuredPost.category}</span>
                        <span>•</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock size={13} /> {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17345E] leading-snug mb-4 hover:text-[#7B2CBF] transition-colors">
                        <Link to={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-3 mb-6 pt-4 border-t border-[#EFE5F7]">
                        <img 
                          src={featuredPost.author.avatarUrl || "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png"} 
                          alt={featuredPost.author.name} 
                          className="h-10 w-10 rounded-full border border-purple-200 object-cover"
                        />
                        <div>
                          <p className="font-extrabold text-xs text-[#17345E]">{featuredPost.author.name}</p>
                          <p className="text-[11px] text-slate-500 font-medium">{featuredPost.author.role}</p>
                        </div>
                      </div>

                      <Link to={`/blog/${featuredPost.slug}`}>
                        <Button className="w-full sm:w-auto bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white font-extrabold text-sm h-12 px-6 rounded-xl border-0 shadow-sm hover:opacity-95 transition-all hover:-translate-y-0.5 group">
                          Read the Story
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* 3. CATEGORY FILTER BAR & SEARCH */}
        <section className="py-8 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all whitespace-nowrap shrink-0 ${
                      selectedCategory === cat 
                        ? 'bg-[#7B2CBF] text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-[#7B2CBF]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search stories & insights..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-[#7B2CBF] focus:ring-2 focus:ring-purple-100 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

            </div>
          </div>
        </section>

        {/* 4. MAIN EDITORIAL / BENTO STORY GALLERY */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {filteredPosts.length === 0 ? (
              <div className="p-16 text-center bg-purple-50/50 rounded-3xl border border-purple-100">
                <BookOpen size={40} className="mx-auto text-slate-400 mb-3" />
                <h3 className="font-extrabold text-lg text-[#17345E] mb-1">No articles found</h3>
                <p className="text-xs text-slate-500 mb-4">Try choosing another category or clearing your search term.</p>
                <Button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="bg-[#7B2CBF] text-white font-extrabold text-xs h-9 px-4 rounded-xl"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.div variants={fadeInUp} key={post.id} className="h-full">
                    <article className="group bg-white rounded-[24px] border border-slate-100 shadow-xs hover:shadow-[0_14px_36px_rgba(123,44,191,0.09)] hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                      
                      {/* Card Image */}
                      <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-[#7B2CBF] shadow-xs">
                          {post.category}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {post.publishedAt}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                        </div>

                        <h3 className="font-extrabold text-lg text-[#17345E] mb-2 leading-snug group-hover:text-[#7B2CBF] transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {post.author.avatarUrl && (
                              <img src={post.author.avatarUrl} alt={post.author.name} className="h-6 w-6 rounded-full object-cover" />
                            )}
                            <span className="text-xs font-bold text-slate-700">{post.author.name}</span>
                          </div>
                          <Link to={`/blog/${post.slug}`} className="text-xs font-extrabold text-[#7B2CBF] flex items-center group-hover:translate-x-1 transition-transform">
                            Read <ArrowRight size={14} className="ml-1" />
                          </Link>
                        </div>

                      </div>

                    </article>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </div>
        </section>

        {/* 5. MOMENTS OF CARE GALLERY */}
        <section className="py-20 bg-[#FFF8FB] border-t border-[#FDF2F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#FF4F81] font-extrabold text-xs uppercase tracking-wider mb-2">
                <Heart size={14} /> Compassion in Action
              </span>
              <h2 className="text-3xl font-extrabold text-[#17345E] mb-3">Moments of Care</h2>
              <p className="text-slate-600 text-base">Real visual glimpses of SilverCare professionals serving elderly parents at home.</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {careMoments.map((moment, idx) => (
                <motion.div variants={fadeInUp} key={idx} className="relative rounded-2xl overflow-hidden group shadow-sm h-64">
                  <img 
                    src={moment.imageUrl} 
                    alt={moment.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17345E]/80 via-transparent to-transparent opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4F81] block mb-1">
                      {moment.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-white">{moment.title}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. CONVERSION CTA */}
        <section className="py-20 bg-[linear-gradient(135deg,#4B2378_0%,#7B2CBF_50%,#D64B8F_100%)] text-white text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-extrabold mb-4">Need support for your loved one?</h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              SilverCare's care coordinators are here to help you navigate personalized home healthcare & nursing options.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/book">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#7B2CBF] hover:bg-slate-50 font-extrabold text-base h-13 px-8 rounded-xl border-0 shadow-lg">
                  Book a Home Visit
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF7A45,#FF9E4A)] text-white hover:opacity-95 font-extrabold text-base h-13 px-8 rounded-xl border-0 shadow-lg">
                  Request Call Back
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
