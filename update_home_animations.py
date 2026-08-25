import re

with open('src/pages/public/Home.tsx', 'r') as f:
    content = f.read()

# Replace <div className="max-w-2xl"> with motion.div
content = content.replace('<div className="max-w-2xl">', '<motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">')
content = content.replace('</div>\n              \n              {/* Right Visual */}', '</motion.div>\n              \n              {/* Right Visual */}')

# 2. Hero Text animations
content = content.replace(
    '<div className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F6]',
    '<motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F6]'
)
content = content.replace('Trusted Healthcare & Eldercare at Home\n                </div>', 'Trusted Healthcare & Eldercare at Home\n                </motion.div>')

content = content.replace(
    '<h1 className="text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-[#17345E] leading-[1.1] mb-6">',
    '<motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-[#17345E] leading-[1.1] mb-6">'
)
content = content.replace('with compassion.</span>\n                </h1>', 'with compassion.</span>\n                </motion.h1>')

content = content.replace(
    '<p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">',
    '<motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">'
)
content = content.replace('the care they deserve.\n                </p>', 'the care they deserve.\n                </motion.p>')

content = content.replace(
    '<div className="flex flex-col sm:flex-row items-center gap-4 mb-8">',
    '<motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-8">'
)
content = content.replace('Explore Services\n                    </Button>\n                  </Link>\n                </div>', 'Explore Services\n                    </Button>\n                  </Link>\n                </motion.div>')

content = content.replace(
    '<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">',
    '<motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">'
)
content = content.replace('Transparent coordination</div>\n                </div>', 'Transparent coordination</div>\n                </motion.div>')

# Hero Image
content = content.replace(
    '<div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80 bg-slate-100 max-w-lg mx-auto lg:max-w-none">',
    '<motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80 bg-slate-100 max-w-lg mx-auto lg:max-w-none">'
)
content = content.replace('Verified & trained</p>\n                    </div>\n                  </div>\n                </div>', 'Verified & trained</p>\n                    </div>\n                  </div>\n                </motion.div>')

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)
