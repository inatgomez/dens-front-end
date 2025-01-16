import * as React from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchIdeas } from "@/services/ideaService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface SearchResult {
  unique_id: string;
  content: string;
  category: string;
  project: {
    unique_id: string;
    title: string;
  };
  matchingFragment: string;
}

const CATEGORIES = [
  "PLOT",
  "CHARACTER",
  "THEME",
  "SETTING",
  "RESEARCH",
  "RANDOM",
];

export function SearchIdeas() {
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [isSearching, setIsSearching] = React.useState(false);
  const router = useRouter();

  const debouncedSearch = React.useCallback(
    debounce(async (query: string, category?: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        const results = await searchIdeas(query, category);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setIsSearching(true);
    debouncedSearch(query, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const searchInput =
      document.querySelector<HTMLInputElement>("#search-input");
    if (searchInput?.value) {
      setIsSearching(true);
      debouncedSearch(searchInput.value, value);
    }
  };

  const handleIdeaClick = (projectId: string) => {
    setOpen(false);
    router.push(`/projects/${projectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-2'>
          <Search className='h-4 w-4' />
          <span>Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Search Ideas</DialogTitle>
        </DialogHeader>
        <div className='flex gap-2 my-4'>
          <Input
            id='search-input'
            placeholder='Search ideas...'
            onChange={handleSearch}
            className='flex-1'
          />
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Category Optional' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
          {isSearching ? (
            <div className='text-center text-muted-foreground'>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className='space-y-4'>
              {searchResults.map((result) => (
                <div
                  key={result.unique_id}
                  className='p-4 border rounded-lg hover:bg-accent cursor-pointer'
                  onClick={() => handleIdeaClick(result.project.unique_id)}
                >
                  <div className='text-sm text-muted-foreground mt-1'>
                    {result.matchingFragment}
                  </div>
                  <div className='flex gap-2 mt-2 text-xs text-muted-foreground'>
                    <span className='bg-secondary px-2 py-1 rounded'>
                      {result.category}
                    </span>
                    <span className='bg-secondary px-2 py-1 rounded'>
                      {result.project.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center text-muted-foreground'>
              There&apos;s no idea matching your search
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
