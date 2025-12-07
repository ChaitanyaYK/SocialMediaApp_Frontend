
function Footer() {
  return (
    <footer className="bg-gray-900 relative z-50 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
        <div className="col-span-2 text-center md:text-right mt-6 md:mt-0">
          <p className="text-gray-500">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
                </div>
            </div>
    </footer>
  );
}
export default Footer;