export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Success Stories' | 'Senior Health' | 'Caregiver Corner' | 'Healthcare Insights' | 'At-Home Care' | 'Healthy Ageing' | 'Community & SilverCare';
  excerpt: string;
  content: string; // Rich markdown or HTML content
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  reviewer?: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  isFeatured?: boolean;
  isSuccessStory?: boolean;
  location?: string;
  serviceCategory?: string;
  tags: string[];
}

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: "A Family's Journey from Hospital Discharge to Confident Home Recovery",
    slug: 'family-journey-hospital-discharge-home-recovery',
    category: 'Success Stories',
    excerpt: 'How structured home nursing care and personalized daily physiotherapy helped a 74-year-old senior regain mobility, independence, and peace of mind after major orthopedic surgery.',
    content: `
      <h2>The Challenge After Hospital Discharge</h2>
      <p>Transitioning from a hospital bed to home can be overwhelming for both seniors and their families. After a major orthopedic procedure, patient recovery requires strict medication schedules, wound dressings, vitals monitoring, and daily physical rehabilitation.</p>
      
      <blockquote className="border-l-4 border-[#7B2CBF] pl-4 italic text-slate-700 my-6 bg-purple-50 p-4 rounded-r-xl">
        "We were deeply anxious about managing medical care at home without a doctor present. SilverCare stepped in on day one with a trained registered nurse and a dedicated physiotherapist."
      </blockquote>

      <h2>Comprehensive Home Care Strategy</h2>
      <p>SilverCare coordinated a dual-phase home care plan:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
        <li><strong>24/7 Home Nursing:</strong> Round-the-clock monitoring of blood pressure, blood glucose, oxygen saturation, and precise medication administration.</li>
        <li><strong>Doctor-Supervised Vitals Log:</strong> Daily medical charts shared directly with the treating consultant.</li>
        <li><strong>Customized Home Physiotherapy:</strong> Gradual passive-to-active range of motion exercises designed to prevent joint stiffness and restore leg strength.</li>
      </ul>

      <h2>The Outcome: Restored Mobility & Dignity</h2>
      <p>Within four weeks of continuous care, full unassisted walking mobility was regained. The family avoided stress, hospital re-admissions, and unnecessary clinical trips.</p>

      <div className="bg-[#FAF5FF] p-6 rounded-2xl border border-[#EFE5F7] my-8">
        <h4 className="font-bold text-[#17345E] text-lg mb-2">Key Takeaways for Families</h4>
        <p className="text-slate-600 text-sm">Post-hospital care is most effective when clinical nursing and daily physical rehabilitation are integrated at home from day one under medical supervision.</p>
      </div>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200&fmt=webp',
    author: {
      name: 'Navin Chauhan',
      role: 'CEO & Founder, SilverCare India',
      avatarUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png'
    },
    reviewer: {
      name: 'Dr. Vikas Sharma',
      role: 'MD, Senior Medical Director'
    },
    publishedAt: 'August 18, 2026',
    readTime: '5 min read',
    isFeatured: true,
    isSuccessStory: true,
    location: 'Chandigarh Tri-City Hub',
    serviceCategory: 'Post-Hospitalization Nursing & Physio',
    tags: ['Success Story', 'Home Nursing', 'Physiotherapy', 'Recovery']
  },
  {
    id: 'blog-2',
    title: '7 Essential Ways to Make Your Parents\' Home Safer for Ageing in Place',
    slug: '7-ways-make-parents-home-safer-ageing-in-place',
    category: 'Senior Health',
    excerpt: 'Practical, low-cost modifications from grab bar placements to ambient night lighting that significantly reduce fall risks for elderly family members.',
    content: `
      <h2>Why Home Safety Modification Matters</h2>
      <p>Falls represent the leading cause of accidental injury among adults aged 65 and older. Simple environmental adjustments inside the home can prevent up to 80% of household falls.</p>

      <h2>1. Install Heavy-Duty Bathroom Grab Bars</h2>
      <p>Smooth bathroom tiles become hazardous when wet. Secure stainless steel grab bars anchored into wall studs near the toilet and shower area provide critical stability.</p>

      <h2>2. Eliminate Loose Rugs & Electrical Cords</h2>
      <p>Unsecured throw rugs are major tripping hazards. Use double-sided rug tape or replace loose rugs with rubber-backed non-slip mats.</p>

      <h2>3. Upgrade Ambient Night Lighting</h2>
      <p>Install motion-sensor LED nightlights along hallways between bedrooms and bathrooms to assist seniors during midnight visits.</p>

      <h2>4. Anti-Skid Stair Treads & Handrails</h2>
      <p>Ensure dual handrails are firmly installed along all staircases and apply high-contrast anti-skid tape on step edges.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000&fmt=webp',
    author: {
      name: 'Komal Gupta',
      role: 'Clinical Operations Lead',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813571-24a69c100d23?auto=format&fit=crop&q=80&w=300'
    },
    reviewer: {
      name: 'Dr. Kirandeep Kaur',
      role: 'Consultant Physiotherapist'
    },
    publishedAt: 'August 12, 2026',
    readTime: '6 min read',
    isFeatured: false,
    location: 'Gurgaon & Delhi NCR',
    serviceCategory: 'Senior Health & Safety',
    tags: ['Fall Prevention', 'Senior Safety', 'Home Modification']
  },
  {
    id: 'blog-3',
    title: 'Understanding Caregiver Burnout: Why Family Caregivers Need Support Too',
    slug: 'understanding-caregiver-burnout-family-support',
    category: 'Caregiver Corner',
    excerpt: 'Recognizing emotional exhaustion, physical fatigue, and actionable respite care strategies for adult children caring for elderly parents.',
    content: `
      <h2>The Hidden Strain of Family Caregiving</h2>
      <p>Balancing a full-time career, personal family life, and continuous caregiving for an elderly parent often leads to silent emotional and physical exhaustion known as caregiver burnout.</p>

      <h2>Common Signs of Caregiver Fatigue</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
        <li>Persistent physical exhaustion and irregular sleep patterns.</li>
        <li>Feelings of anxiety, helplessness, or irritability.</li>
        <li>Neglecting personal health checkups and nutritional needs.</li>
      </ul>

      <h2>How Professional Respite Care Helps</h2>
      <p>Engaging trained home care attendants or registered nurses for a few hours daily or dedicated shifts grants family caregivers vital time to rest and recharge without compromising their parent's care.</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000&fmt=webp',
    author: {
      name: 'Ms. Jasbir Kour',
      role: 'Senior Care Specialist'
    },
    publishedAt: 'August 05, 2026',
    readTime: '4 min read',
    isFeatured: false,
    location: 'All Operating Regions',
    serviceCategory: 'Respite Care & Caregiver Support',
    tags: ['Caregiver Support', 'Mental Wellness', 'Respite Care']
  },
  {
    id: 'blog-4',
    title: 'Why At-Home Healthcare Is Transforming Senior Care Across Gurgaon & Delhi NCR',
    slug: 'at-home-healthcare-transforming-senior-care-gurgaon-delhi',
    category: 'Healthcare Insights',
    excerpt: 'Exploring how doctor home visits, 24/7 nursing, and doorstep diagnostics prevent unnecessary hospital readmissions for elder citizens in Gurgaon Sector 33 and Delhi NCR.',
    content: `
      <h2>The Shift Towards Home-Based Clinical Care</h2>
      <p>Navigating dense traffic, long hospital waiting rooms, and crowded OPD clinics can be physically draining for elderly individuals with chronic conditions or mobility challenges.</p>

      <h2>Benefits of Doorstep Medical Care in Gurgaon</h2>
      <p>With SilverCare's Sector-33 hub in Gurgaon, families access hospital-grade clinical interventions directly in their living rooms:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
        <li><strong>On-Demand Doctor Visits:</strong> Comprehensive bedside clinical evaluation by qualified physicians.</li>
        <li><strong>Home Blood Sample Collection:</strong> Fast, hygienic diagnostic testing with digital report delivery within 12 hours.</li>
        <li><strong>Continuous Vitals & ICU Care:</strong> Trained nursing personnel equipped for tracheostomy, catheterization, and IV therapy.</li>
      </ul>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000&fmt=webp',
    author: {
      name: 'Navin Chauhan',
      role: 'CEO & Founder, SilverCare India'
    },
    reviewer: {
      name: 'Dr. Vikas Sharma',
      role: 'Senior Medical Director'
    },
    publishedAt: 'July 28, 2026',
    readTime: '7 min read',
    isFeatured: false,
    location: 'Gurgaon Sector 33 Hub',
    serviceCategory: 'Doctor Home Visits & Diagnostics',
    tags: ['Gurgaon', 'Delhi NCR', 'Doctor Visit', 'Home Care']
  },
  {
    id: 'blog-5',
    title: 'Mobility After 60: Small Daily Habits That Preserve Joint Health & Balance',
    slug: 'mobility-after-60-daily-habits-preserve-joint-health',
    category: 'Healthy Ageing',
    excerpt: 'Targeted physiotherapy insights on gentle joint movements, hydration, and balance routines designed to keep seniors active and independent.',
    content: `
      <h2>Maintaining Active Independence</h2>
      <p>Regular physical movement after age 60 is essential for maintaining joint lubrication, muscle tone, and core balance stability.</p>

      <h2>Recommended Daily Mobility Exercises</h2>
      <p>Our senior physiotherapists recommend 15 to 20 minutes of daily low-impact exercise:</p>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
        <li><strong>Ankle Pumps & Rotations:</strong> Improves lower leg circulation and ankle mobility.</li>
        <li><strong>Seated Knee Extensions:</strong> Strengthens quadriceps muscles vital for comfortable standing and walking.</li>
        <li><strong>Tandem Balance Stance:</strong> Standing near a sturdy counter top to enhance equilibrium and balance.</li>
      </ul>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000&fmt=webp',
    author: {
      name: 'Dr. Kirandeep Kaur',
      role: 'Lead Physiotherapist'
    },
    publishedAt: 'July 20, 2026',
    readTime: '5 min read',
    isFeatured: false,
    location: 'Tri-City & Gurgaon',
    serviceCategory: 'Home Physiotherapy',
    tags: ['Physiotherapy', 'Healthy Ageing', 'Mobility']
  },
  {
    id: 'blog-6',
    title: 'Hospital Discharge Is Only the Beginning: Preparing Your Home for Specialized Nursing Care',
    slug: 'hospital-discharge-preparing-home-specialized-nursing-care',
    category: 'At-Home Care',
    excerpt: 'A step-by-step checklist for families setting up medical beds, oxygen support, and 24/7 nursing attendants following hospital discharge.',
    content: `
      <h2>Preparing the Patient Room</h2>
      <p>Before a senior patient returns home from surgical or ICU admission, room preparation ensures safety, hygiene, and medical efficiency.</p>

      <h2>Key Preparation Steps</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
        <li>Position medical bed near grounded electrical sockets for equipment like suction pumps and oxygen concentrators.</li>
        <li>Maintain sterile hand hygiene stations with hand sanitizers and disposable gloves.</li>
        <li>Keep emergency contact numbers for SilverCare dispatch (+91 800-14-800-75) posted prominently.</li>
      </ul>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000&fmt=webp',
    author: {
      name: 'Ms. Tejinder Sharma',
      role: 'Nurse Manager'
    },
    publishedAt: 'July 14, 2026',
    readTime: '5 min read',
    isFeatured: false,
    location: 'North India Operating Hubs',
    serviceCategory: 'Home Nursing Care',
    tags: ['Hospital Discharge', 'Home Nursing', 'ICU Care']
  }
];
