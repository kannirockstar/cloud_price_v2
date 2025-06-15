export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Cloud Price Comparator V2. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Pricing data is for illustrative purposes only. Always check official provider websites.
        </p>
      </div>
    </footer>
  );
}
