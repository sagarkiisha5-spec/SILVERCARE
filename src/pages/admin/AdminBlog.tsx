import { useState } from 'react';
import { initialBlogPosts, BlogPost } from '@/src/data/blogData';
import { Button } from '@/src/components/ui/button';
import { Plus, Edit2, Trash2, BookOpen, Sparkles, MapPin, Eye, CheckCircle2, FileText, Search } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Senior Health',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: { name: 'Navin Chauhan', role: 'CEO & Founder, SilverCare India' },
    publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    isFeatured: false,
    isSuccessStory: false,
    location: 'Gurgaon Sector 33 Hub',
    tags: ['Senior Health', 'Eldercare']
  });

  const handleSave = () => {
    if (!form.title || !form.excerpt) return;
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: form.category as any || 'Senior Health',
      excerpt: form.excerpt,
      content: form.content || `<p>${form.excerpt}</p>`,
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000&fmt=webp',
      author: form.author || { name: 'Navin Chauhan', role: 'CEO & Founder' },
      publishedAt: form.publishedAt || 'August 2026',
      readTime: form.readTime || '5 min read',
      isFeatured: form.isFeatured || false,
      isSuccessStory: form.isSuccessStory || false,
      location: form.location || 'Gurgaon Hub',
      tags: form.tags || ['Eldercare']
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setForm({
      title: '',
      slug: '',
      category: 'Senior Health',
      excerpt: '',
      content: '',
      imageUrl: '',
      author: { name: 'Navin Chauhan', role: 'CEO & Founder, SilverCare India' },
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      isFeatured: false,
      isSuccessStory: false,
      location: 'Gurgaon Sector 33 Hub',
      tags: ['Senior Health', 'Eldercare']
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this article?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#17345E]">Blog & Stories Manager</h1>
          <p className="text-xs text-slate-500">Manage healthcare insights, success stories, and regional eldercare articles.</p>
        </div>

        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-extrabold text-xs h-11 px-5 rounded-xl shadow-sm flex items-center gap-2"
        >
          <Plus size={16} /> Add New Article
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Articles</p>
          <p className="text-2xl font-black text-[#17345E] mt-1">{posts.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Success Stories</p>
          <p className="text-2xl font-black text-[#FF4F81] mt-1">{posts.filter(p => p.isSuccessStory).length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Featured Posts</p>
          <p className="text-2xl font-black text-[#7B2CBF] mt-1">{posts.filter(p => p.isFeatured).length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Operating Locations</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">4 Regions</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search articles by title or category..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#7B2CBF]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-5 max-w-md">
                    <div className="flex items-center gap-3">
                      <img src={post.imageUrl} alt={post.title} className="h-10 w-14 rounded-lg object-cover shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-900 leading-snug">{post.title}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate max-w-xs">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#7B2CBF] font-extrabold text-[11px]">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {post.location || 'General'}
                  </td>
                  <td className="py-4 px-4 text-slate-500">
                    {post.publishedAt}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-[#7B2CBF]">
                        <Eye size={14} />
                      </a>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-[#17345E]">Add New Blog Article</h3>
            
            <div className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1">Article Title *</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF]"
                  placeholder="e.g. Preparing Your Home for Eldercare Nursing"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Category *</label>
                  <select 
                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF]"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  >
                    <option value="Success Stories">Success Stories</option>
                    <option value="Senior Health">Senior Health</option>
                    <option value="Caregiver Corner">Caregiver Corner</option>
                    <option value="Healthcare Insights">Healthcare Insights</option>
                    <option value="At-Home Care">At-Home Care</option>
                    <option value="Healthy Ageing">Healthy Ageing</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Operating Region</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF]"
                    placeholder="e.g. Gurgaon Sector 33 Hub"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Article Excerpt *</label>
                <textarea 
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF]"
                  placeholder="Brief 2-3 line summary of the post..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1">Featured Cover Image URL</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF]"
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="rounded text-[#7B2CBF]"
                  />
                  <span>Set as Featured Story</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={form.isSuccessStory}
                    onChange={(e) => setForm({ ...form, isSuccessStory: e.target.checked })}
                    className="rounded text-[#FF4F81]"
                  />
                  <span>Mark as Success Story</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="h-10 px-5 rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#7B2CBF] text-white font-extrabold h-10 px-6 rounded-xl">
                Publish Article
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
