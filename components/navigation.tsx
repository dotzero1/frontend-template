'use client';

export function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        <a href="/" className="text-xl font-semibold">
          My Application
        </a>
        {/* Add navigation items here */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Example navigation links */}
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Documentation
          </a>
        </div>
      </div>
    </nav>
  );
}