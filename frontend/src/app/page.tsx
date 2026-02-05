import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6 drop-shadow-sm">
        Mini Event Tracker
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mb-10 leading-relaxed">
        Discover, create, and join local events effortlessly. Manage your schedule and connect with organizers in one place.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/register" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
        <Link 
          href="/dashboard" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition shadow-md border border-blue-100"
        >
          Browse Events
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Organize</h3>
          <p className="text-gray-600">Create and manage your own events with ease.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Connect</h3>
          <p className="text-gray-600">Join events and meet people with similar interests.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Secure</h3>
          <p className="text-gray-600">Built with secure authentication and modern tech.</p>
        </div>
      </div>
    </div>
  );
}
