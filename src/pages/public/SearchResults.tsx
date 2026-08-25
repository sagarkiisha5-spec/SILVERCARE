import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight, Home, PhoneCall, Search } from 'lucide-react';
import { useAppContent, Service, fallbackServices } from '@/src/hooks/useAppContent';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';
import SEO from '@/src/components/seo/SEO';
import ServiceSearch from '@/src/components/shared/ServiceSearch';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { services, loading } = useAppContent();
  const [results, setResults] = useState<Service[]>([]);

  const searchableServices = services.length > 0 ? services : fallbackServices;

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const matches = searchableServices.filter(srv => {
      if (srv.title.toLowerCase().includes(lowerQuery)) return true;
      if (srv.shortDescription.toLowerCase().includes(lowerQuery)) return true;
      if (srv.aliases?.some(alias => alias.toLowerCase().includes(lowerQuery))) return true;
      if (srv.category?.toLowerCase().includes(lowerQuery)) return true;
      return false;
    });
    setResults(matches);
  }, [query, services]);

  return (
    <>
      <SEO 
        title={`Search results for "${query}" - SILVERCARE`} 
        description="Search results for healthcare services at home."
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="bg-slate-50 min-h-screen pt-8 pb-24 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center hover:text-[#7B2CBF] transition-colors">
              <Home size={16} className="mr-1.5" />
              Home
            </Link>
            <ChevronRight size={16} className="mx-2 text-slate-300" />
            <span className="text-slate-900">Search Results</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-6">Search for Care</h1>
              <ServiceSearch placeholder="Search nursing, physiotherapy, doctor visit..." size="large" className="mx-auto" />
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {query ? `Search results for "${query}"` : 'Please enter a search term'}
              </h2>

              {loading ? (
                <div className="py-12 text-center text-slate-500">Searching services...</div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map(srv => (
                    <Card key={srv.id} className="overflow-hidden border-slate-200 hover:border-[#9D4EDD] hover:shadow-md transition-all bg-white group">
                      <Link to={`/services/${srv.slug}`} className="block">
                        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#6A24A6] transition-colors">{srv.title}</h3>
                              {srv.category && (
                                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{srv.category}</span>
                              )}
                            </div>
                            <p className="text-slate-600 text-sm">{srv.shortDescription}</p>
                          </div>
                          <div className="shrink-0 flex items-center text-[#7B2CBF] font-bold text-sm">
                            View Details <ArrowRight size={16} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : query ? (
                <Card className="bg-white border-slate-200 text-center py-16">
                  <CardContent>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-6">
                      <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">We couldn't find an exact match.</h3>
                    <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">
                      We might still be able to help. You can view all our core services or contact us directly to discuss your specific needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link to="/services" className="w-full sm:w-auto">
                        <Button className="w-full bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-90 border-0 text-white font-bold h-12 px-8">View All Services</Button>
                      </Link>
                      <a href="tel:+918001480075" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 font-bold h-12 px-8">Talk to SILVERCARE</Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}