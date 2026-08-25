import re

with open('src/pages/public/Home.tsx', 'r') as f:
    content = f.read()

# Add motion import
content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { motion } from "motion/react";')

# Define some animation variants right before the Home component
variants = """
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

"""
content = content.replace('export default function Home() {', variants + 'export default function Home() {')

# Hero section animations
# Split hero text container
content = content.replace(
    '<div className="max-w-2xl">', 
    '<motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">'
)
# Close motion.div for max-w-2xl
content = content.replace(
    '</div>\n              \n              {/* Right Visual */}',
    '</motion.div>\n              \n              {/* Right Visual */}'
)

# Hero badge
content = content.replace(
    '<div className="inline-flex items-center',
    '<motion.div variants={fadeInUp} className="inline-flex items-center'
)
# Make sure to only replace the first closing div for this (which is hard via string replace, let's use regex or just be careful)
content = content.replace('Trusted Healthcare & Eldercare at Home\n                </div>', 'Trusted Healthcare & Eldercare at Home\n                </motion.div>')

# Hero title
content = content.replace(
    '<h1 className="text-4xl md:text-5xl lg:text-[4.2rem]',
    '<motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-[4.2rem]'
)
content = content.replace('</span>\n                </h1>', '</span>\n                </motion.h1>')

# Hero paragraph
content = content.replace(
    '<p className="text-lg md:text-xl text-slate-600',
    '<motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600'
)
content = content.replace('the care they deserve.\n                </p>', 'the care they deserve.\n                </motion.p>')

# Hero buttons
content = content.replace(
    '<div className="flex flex-col sm:flex-row items-center gap-4 mb-8">',
    '<motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-8">'
)
content = content.replace(
    'Explore Services\n                    </Button>\n                  </Link>\n                </div>',
    'Explore Services\n                    </Button>\n                  </Link>\n                </motion.div>'
)

# Trust Indicators
content = content.replace(
    '<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">',
    '<motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">'
)
content = content.replace(
    '<div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#9D4EDD]" /> Transparent coordination</div>\n                </div>',
    '<div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#9D4EDD]" /> Transparent coordination</div>\n                </motion.div>'
)

# Right Visual Image
content = content.replace(
    '<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80 bg-slate-100 max-w-lg mx-auto lg:max-w-none">',
    '<motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80 bg-slate-100 max-w-lg mx-auto lg:max-w-none">'
)
content = content.replace(
    '<p className="text-sm text-slate-500">Verified & trained</p>\n                    </div>\n                  </div>\n                </div>',
    '<p className="text-sm text-slate-500">Verified & trained</p>\n                    </div>\n                  </div>\n                </motion.div>'
)

# Update floating search section
content = content.replace(
    '<div className="container mx-auto max-w-4xl">',
    '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="container mx-auto max-w-4xl">'
)
content = content.replace(
    '</Button>\n              </Link>\n            </div>\n          </div>\n        </section>',
    '</Button>\n              </Link>\n            </div>\n          </motion.div>\n        </section>'
)

# Quick Service Selector Section
content = content.replace(
    '<div className="text-center max-w-2xl mx-auto mb-12">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">'
)
content = content.replace(
    'Choose the care your loved one needs.</p>\n            </div>',
    'Choose the care your loved one needs.</p>\n            </motion.div>'
)

content = content.replace(
    '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">'
)
content = content.replace(
    '</Link>\n                  );\n                })}\n              </div>',
    '</Link>\n                  );\n                })}\n              </motion.div>'
)

content = content.replace(
    '<Link key={service.id}',
    '<motion.div variants={fadeInUp} className="h-full"><Link key={service.id}'
)
content = content.replace(
    'Learn More <ArrowRight size={16} className="ml-2" />\n                      </div>\n                    </Link>',
    'Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />\n                      </div>\n                    </Link></motion.div>'
)


# Compassion Section
content = content.replace(
    '<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">\n              <div>',
    '<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">\n              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft}>'
)
content = content.replace(
    '</div>\n                  ))}                </div>\n              </div>\n              <div className="relative rounded-[32px] overflow-hidden shadow-2xl">',
    '</div>\n                  ))}                </div>\n              </motion.div>\n              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight} className="relative rounded-[32px] overflow-hidden shadow-2xl group">'
)
# Add image hover effect
content = content.replace(
    'className="w-full h-[500px] object-cover"',
    'className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"'
)
content = content.replace(
    '<div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-10"></div>\n              </div>\n            </div>',
    '<div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-10"></div>\n              </motion.div>\n            </div>'
)

# Why SilverCare
content = content.replace(
    '<div className="text-center max-w-2xl mx-auto mb-16">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">'
)
content = content.replace(
    'Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B6B,#9D4EDD)]">SilverCare</span></h2>\n            </div>',
    'Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B6B,#9D4EDD)]">SilverCare</span></h2>\n            </motion.div>'
)

content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">'
)
content = content.replace(
    '</p>\n                </div>\n              ))}\n            </div>',
    '</p>\n                </motion.div>\n              ))}\n            </motion.div>'
)
content = content.replace(
    '<div key={i} className="bg-white border border-[#EFE5F7]',
    '<motion.div key={i} variants={fadeInUp} className="bg-white border border-[#EFE5F7] group'
)

# Icon subtle hover
content = content.replace(
    '<feature.icon size={32} className="text-[#9D4EDD] mb-6" strokeWidth={1.5} />',
    '<div className="transform transition-transform duration-300 group-hover:scale-105"><feature.icon size={32} className="text-[#9D4EDD] mb-6" strokeWidth={1.5} /></div>'
)


# How It Works
content = content.replace(
    '<h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#17345E]">Quality care, without the complexity.</h2>',
    '<motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-16 text-[#17345E]">Quality care, without the complexity.</motion.h2>'
)
content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">'
)
content = content.replace(
    '<div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#F4C7DB] z-0"></div>',
    '<motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut" }} style={{ transformOrigin: "left" }} className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#F4C7DB] z-0"></motion.div>'
)
content = content.replace(
    '<div key={i} className="relative z-10 flex flex-col items-center">',
    '<motion.div key={i} variants={fadeInUp} className="relative z-10 flex flex-col items-center">'
)
content = content.replace(
    '<h3 className="text-lg font-bold w-3/4 leading-snug text-[#17345E]">{item.title}</h3>\n                </div>\n              ))}\n            </div>',
    '<h3 className="text-lg font-bold w-3/4 leading-snug text-[#17345E]">{item.title}</h3>\n                </motion.div>\n              ))}\n            </motion.div>'
)

# Trust / Stats (simple fade up)
content = content.replace(
    '<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#EFE5F7]">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#EFE5F7]">'
)
content = content.replace(
    '<div className="px-4">',
    '<motion.div variants={fadeInUp} className="px-4">'
)
content = content.replace(
    '<div className="text-slate-500 font-medium">Family Satisfaction</div>\n              </div>\n            </div>',
    '<div className="text-slate-500 font-medium">Family Satisfaction</div>\n              </motion.div>\n            </motion.div>'
)
# Fix the other closing divs
content = content.replace(
    'Families Supported</div>\n              </div>',
    'Families Supported</div>\n              </motion.div>'
)
content = content.replace(
    'Care Professionals</div>\n              </div>',
    'Care Professionals</div>\n              </motion.div>'
)
content = content.replace(
    'Cities Served</div>\n              </div>',
    'Cities Served</div>\n              </motion.div>'
)


# Testimonials
content = content.replace(
    '<div className="text-center max-w-2xl mx-auto mb-16">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">'
)
content = content.replace(
    '<h2 className="text-3xl md:text-4xl font-bold text-[#17345E]">What families say about SilverCare</h2>\n              </div>',
    '<h2 className="text-3xl md:text-4xl font-bold text-[#17345E]">What families say about SilverCare</h2>\n              </motion.div>'
)
content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-3 gap-8">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">'
)
content = content.replace(
    '<div key={testimonial.id} className="bg-white p-8',
    '<motion.div variants={fadeInUp} key={testimonial.id} className="bg-white p-8'
)
content = content.replace(
    '<p className="font-bold text-[#17345E]">{testimonial.patientName}</p>\n                    </div>\n                  </div>\n                ))}\n              </div>',
    '<p className="font-bold text-[#17345E]">{testimonial.patientName}</p>\n                    </div>\n                  </motion.div>\n                ))}\n              </motion.div>'
)


# Area Checker
content = content.replace(
    '<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">'
)
content = content.replace(
    'Check Availability\n              </Button>\n            </div>\n          </div>',
    'Check Availability\n              </Button>\n            </div>\n          </motion.div>'
)

# Final CTA
content = content.replace(
    '<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">',
    '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">'
)
content = content.replace(
    '<a href="tel:+918001480075" className="text-white font-bold hover:text-[#FF9E4A]">+91 800-14-800-75</a>\n            </p>\n          </div>',
    '<a href="tel:+918001480075" className="text-white font-bold hover:text-[#FF9E4A]">+91 800-14-800-75</a>\n            </p>\n          </motion.div>'
)

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)

