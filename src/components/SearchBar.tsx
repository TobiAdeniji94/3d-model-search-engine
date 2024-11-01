"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
  filePath: string;
}

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false); // to display results 

  const search = async () => {
    if (!query) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Failed to fetch results");
        const data: Product[] = await response.json();
        setResults(data);
        setShowResults(true); // to show results on successful search
      } catch (error) {
        console.error("Search error:", error);
      }
    });
  };

  const handleClickOutside = () => {
    setShowResults(false); // hides results when clicking outside
  };

  return (
    <div className="relative w-full flex flex-col bg-white">
      <div className="relative flex items-center rounded-md shadow-md">
        <Input
          disabled={isSearching}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
            if (e.key === "Escape") inputRef?.current?.blur();
          }}
          ref={inputRef}
          onFocus={() => setShowResults(true)} // to show results on focus
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-black"
          placeholder="Search..."
        />
        <Button
          className="h-full px-4 bg-gray-200 hover:bg-gray-300 rounded-r-md"
          disabled={isSearching}
          onClick={search}
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </Button>
      </div>

      {/* Dropdown for Search Results */}
      {showResults && results.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-y-auto max-h-60"
          style={{ left: 0 }}
        >
          <h3 className="text-lg font-bold p-4 border-b text-black">Search Results:</h3>
          {results.map((product) => (
            <div key={product.id} className="flex items-center p-4 border-b last:border-b-0">
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold text-black">{product.name}</p>
                <p className="text-sm text-black">{product.description}</p>
                {/* <p className="text-sm font-medium text-gray-800 mt-1">Price: ${product.priceInCents / 100}</p> */}
              </div>
              <a
                href={`/${product.id}/download`}
                download
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
