// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10 mt-20">
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Top Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          
          <div className="space-y-3">
            <h4 className="text-white font-medium">Company</h4>
            <p className="hover:text-white cursor-pointer">About Us</p>
            <p className="hover:text-white cursor-pointer">Careers</p>
            <p className="hover:text-white cursor-pointer">Press</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Support</h4>
            <p className="hover:text-white cursor-pointer">Help Center</p>
            <p className="hover:text-white cursor-pointer">Contact</p>
            <p className="hover:text-white cursor-pointer">Privacy</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Legal</h4>
            <p className="hover:text-white cursor-pointer">Terms of Use</p>
            <p className="hover:text-white cursor-pointer">Cookie Policy</p>
            <p className="hover:text-white cursor-pointer">Licenses</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Social</h4>
            <p className="hover:text-white cursor-pointer">Instagram</p>
            <p className="hover:text-white cursor-pointer">Twitter</p>
            <p className="hover:text-white cursor-pointer">YouTube</p>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Netflix Clone. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Made By Amit Pal
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer