'use client';

import { StarIcon, ShieldCheckIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { GlobeAltIcon, TrophyIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9c5a0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    quote: "These SEO tools increased our organic traffic by 180% in just 3 months. The audit tool found issues our team missed for years.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "SEO Specialist",
    company: "Digital Growth Agency",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    quote: "The keyword research tool is incredibly accurate. We've ranked #1 for 15 new keywords this quarter using their insights.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Local Biz Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    quote: "Perfect for small businesses! The meta tags generator alone saved us 10 hours of work and improved our click-through rates by 45%.",
    rating: 5
  }
];

const stats = [
  { label: "Websites Analyzed", value: "25,000+", icon: GlobeAltIcon },
  { label: "Keywords Tracked", value: "500K+", icon: ChartBarIcon },
  { label: "Happy Customers", value: "2,500+", icon: UserGroupIcon },
  { label: "Avg. Traffic Increase", value: "156%", icon: TrophyIcon }
];

const trustBadges = [
  { name: "30-Day Money Back", description: "Risk-free guarantee" },
  { name: "256-bit SSL Secure", description: "Bank-level security" },
  { name: "GDPR Compliant", description: "Privacy protected" },
  { name: "24/7 Support", description: "Always here to help" }
];

export function SocialProof() {
  return (
    <div className="bg-white">
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands</h3>
            <p className="text-gray-600">Join successful businesses already using our SEO tools</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how businesses like yours are achieving amazing results with our SEO tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Security & Success Are Our Priority</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-6">As featured in</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Search Engine Land</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">SEO Journal</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Marketing Weekly</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function CompactSocialProof() {
  return (
    <div className="bg-blue-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">25,000+</div>
              <div className="text-xs text-gray-600">Sites Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">4.9/5</div>
              <div className="text-xs text-gray-600">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">156%</div>
              <div className="text-xs text-gray-600">Avg. Growth</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-medium">U</span>
                  </div>
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-600">2,500+ happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 