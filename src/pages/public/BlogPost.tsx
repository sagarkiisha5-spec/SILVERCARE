import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, MapPin, Share2, CheckCircle2, Bookmark, Heart, ShieldCheck, ArrowRight, MessageSquare, Copy, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import SEO from '@/src/components/seo/SEO';
import { initialBlogPosts, BlogPost as BlogPostType } from '@/src/data/blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = initialBlogPosts.find(p => p.slug === slug) || initialBlogPosts[0];

  const relatedPosts = initialBlogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  const shareUrl = window.location.href;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO 
        title={`${post.title} | SilverCare India`}
        description={post.excerpt}
      />

      <article className="flex flex-col font-sans bg-white text-slate-800 pb-20">
        
        {/* Top Header & Breadcrumb */}
        <div className="bg-[#FAF5FF] border-b border-[#F5E8FF] py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
              <Link to="/" className="hover:text-[#7B2CBF]">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[#7B2CBF]">Blog</Link>
              <span>/</span>
              <span className="text-[#7B2CBF] font-bold truncate max-w-xs">{post.title}</span>
            </div>

            <Link to="/blog" className="inline-flex items-center text-xs font-extrabold text-[#7B2CBF] hover:text-[#6A24A6] transition-colors mb-6 group">
              <ArrowLeft size={14} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Back to All Stories
            </Link>

            {/* Category & Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold mb-4">
              <span className="px-3 py-1 rounded-full bg-[#7B2CBF] text-white">
                {post.category}
              </span>
              {post.location && (
                <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 flex items-center gap-1">
                  <MapPin size={12} className="text-[#FF4F81]" /> {post.location}
                </span>
              )}
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar size={13} /> {post.publishedAt}
              </span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17345E] leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author & Reviewer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#EFE5F7]">
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatarUrl || "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png"} 
                  alt={post.author.name} 
                  className="h-11 w-11 rounded-full object-cover border-2 border-purple-200"
                />
                <div>
                  <p className="font-extrabold text-sm text-[#17345E]">{post.author.name}</p>
                  <p className="text-xs text-slate-500">{post.author.role}</p>
                </div>
              </div>

              {post.reviewer && (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>Medically Reviewed by <strong>{post.reviewer.name}</strong></span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-8 mb-12">
          <div className="relative rounded-[28px] overflow-hidden shadow-lg border border-slate-100 max-h-[500px]">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Article Body Content (Optimal 760px Width) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Medical & Health Disclaimer */}
          <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
            <ShieldCheck size={18} className="text-purple-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Medical Disclaimer:</strong> This article is intended for general educational awareness and family guidance. It does not replace individual clinical diagnosis or professional medical advice. Always consult a qualified physician for healthcare decisions.
            </div>
          </div>

          {/* Tags & Social Sharing Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-purple-50 text-[#7B2CBF] text-xs font-bold">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Share:</span>
              
              <button 
                onClick={copyShareLink}
                className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-[#7B2CBF] transition-colors"
                title="Copy Article Link"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>

              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - Read more on SilverCare: ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageSquare size={16} />
              </a>
            </div>

          </div>

          {/* Author Box */}
          <div className="mt-12 p-6 rounded-2xl bg-[#FAF5FF] border border-[#EFE5F7] flex items-center gap-4">
            <img 
              src={post.author.avatarUrl || "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png"} 
              alt={post.author.name} 
              className="h-16 w-16 rounded-full object-cover border-2 border-purple-200 shrink-0"
            />
            <div>
              <h4 className="font-extrabold text-base text-[#17345E]">{post.author.name}</h4>
              <p className="text-xs font-bold text-[#7B2CBF] mb-1">{post.author.role}</p>
              <p className="text-xs text-slate-600">Dedicated to advancing compassionate home healthcare, senior wellness, and clinical support across India.</p>
            </div>
          </div>

        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-16 bg-[#FAF5FF] border-t border-[#F5E8FF]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <h3 className="text-2xl font-extrabold text-[#17345E] mb-8">You may also find helpful</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <Link 
                    key={relPost.id} 
                    to={`/blog/${relPost.slug}`}
                    className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-100">
                      <img src={relPost.imageUrl} alt={relPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[11px] font-extrabold text-[#FF4F81] uppercase mb-1">{relPost.category}</span>
                    <h4 className="font-extrabold text-sm text-[#17345E] group-hover:text-[#7B2CBF] transition-colors leading-snug mb-2 flex-grow">
                      {relPost.title}
                    </h4>
                    <span className="text-xs font-bold text-[#7B2CBF] flex items-center mt-2">
                      Read Article <ChevronRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Care CTA */}
        <section className="mt-16 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-[linear-gradient(135deg,#1E1B4B_0%,#3B0764_100%)] text-white rounded-[28px] p-8 sm:p-10 text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Need support for a loved one?</h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
              SilverCare's care coordinators are available 24/7 to help you structure personalized home healthcare for your family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/book">
                <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] text-white font-extrabold text-sm h-12 px-8 rounded-xl border-0 shadow-md">
                  Book a Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 font-extrabold text-sm h-12 px-8 rounded-xl border-white/20">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
