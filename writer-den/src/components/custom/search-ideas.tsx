import React, { forwardRef, useEffect, useMemo, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import Link from "next/link";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import DOMPurify from "dompurify";

import { useLazySearchIdeasQuery } from "@/redux/features/ideaApiSlice";

const CATEGORY_OPTIONS = [
  "PLOT",
  "CHARACTER",
  "THEME",
  "SETTING",
  "RESEARCH",
  "RANDOM",
];

export const SearchIdeas = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [triggerSearch, { data: searchResults = [], isFetching }] =
    useLazySearchIdeasQuery();

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string, category?: string) => {
        if (query.length < 2) return;
        triggerSearch({ query, category });
      }, 300),
    [triggerSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (searchQuery.length >= 2) {
      debouncedSearch(searchQuery, value);
    }
  };

  const processHighlightedContent = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return sanitizedContent
      .replace(
        /<mark>/g,
        '<span class="bg-primary text-primary-foreground px-1 py-0.5 rounded">'
      )
      .replace(/<\/mark>/g, "</span>");
  };

  return (
    <div ref={ref}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <SidebarMenuButton tooltip='Search'>
            <Search className='h-4 w-4' />
            <span>Search</span>
          </SidebarMenuButton>
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
              className='flex-1 text-sm text-slate-50'
            />
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Category Optional' />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className='h-[400px] w-full p-2'>
            {isFetching ? (
              <div className='text-center text-muted-foreground'>
                Searching...
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className='space-y-4'>
                {searchResults.map((result) => (
                  <Link
                    key={result.unique_id}
                    href={`/projects/${result.project_id}`}
                    onClick={() => setOpen(false)}
                    className='block p-4 border rounded-lg hover:bg-accent cursor-pointer'
                  >
                    <div
                      className='text-sm text-muted-foreground mt-1'
                      dangerouslySetInnerHTML={{
                        __html: processHighlightedContent(
                          result.highlighted_content
                        ),
                      }}
                    />
                    <div className='flex gap-2 mt-2 text-xs text-muted-foreground'>
                      <span className='bg-secondary px-2 py-1 rounded'>
                        {result.category.charAt(0).toUpperCase() +
                          result.category.slice(1).toLocaleLowerCase()}
                      </span>
                      <span className='bg-secondary px-2 py-1 rounded'>
                        {result.project_name}
                      </span>
                    </div>
                  </Link>
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
    </div>
  );
});
