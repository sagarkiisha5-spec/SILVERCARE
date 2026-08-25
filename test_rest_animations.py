import re

with open('src/pages/public/Home.tsx', 'r') as f:
    content = f.read()

# 2. FLOATING SEARCH
content = content.replace('<div className="container mx-auto max-w-4xl">', '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="container mx-auto max-w-4xl">')
content = content.replace('</Button>\n              </Link>\n            </div>\n          </div>\n        </section>', '</Button>\n              </Link>\n            </div>\n          </motion.div>\n        </section>')

# 3. QUICK SERVICE SELECTOR
content = content.replace('<div className="text-center max-w-2xl mx-auto mb-12">', '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-12">')
content = content.replace('Choose the care your loved one needs.</p>\n            </div>', 'Choose the care your loved one needs.</p>\n            </motion.div>')

content = content.replace('<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">', '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">')
content = content.replace('</Link>\n                  );\n                })}\n              </div>', '</Link>\n                  );\n                })}\n              </motion.div>')

content = content.replace('return (\n                    <Link key={service.id}', 'return (\n                    <motion.div variants={fadeInUp} className="h-full"><Link key={service.id}')
content = content.replace('Learn More <ArrowRight size={16} className="ml-2" />\n                      </div>\n                    </Link>', 'Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />\n                      </div>\n                    </Link></motion.div>')

# 4. COMPASSION SECTION
content = content.replace('<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">\n              <div>', '<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">\n              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft}>')
content = content.replace('</div>\n                  ))}                </div>\n              </div>\n              <div className="relative rounded-[32px] overflow-hidden shadow-2xl">', '</div>\n                  ))}                </div>\n              </motion.div>\n              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight} className="relative rounded-[32px] overflow-hidden shadow-2xl group">')

content = content.replace('className="w-full h-[500px] object-cover"', 'className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"')
content = content.replace('<div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-10"></div>\n              </div>\n            </div>', '<div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-10"></div>\n              </motion.div>\n            </div>')

# 5. WHY SILVERCARE
content = content.replace('<div className="text-center max-w-2xl mx-auto mb-16">', '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">')
content = content.replace('Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B6B,#9D4EDD)]">SilverCare</span></h2>\n            </div>', 'Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B6B,#9D4EDD)]">SilverCare</span></h2>\n            </motion.div>')

content = content.replace('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">', '<motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">')
content = content.replace('</p>\n                </div>\n              ))}\n            </div>', '</p>\n                </motion.div>\n              ))}\n            </motion.div>')
content = content.replace('<div key={i} className="bg-white border border-[#EFE5F7]', '<motion.div key={i} variants={fadeInUp} className="bg-white border border-[#EFE5F7] group')

content = content.replace('<feature.icon size={32} className="text-[#9D4EDD] mb-6" strokeWidth={1.5} />', '<div className="transform transition-transform duration-300 group-hover:scale-105"><feature.icon size={32} className="text-[#9D4EDD] mb-6" strokeWidth={1.5} /></div>')

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)
