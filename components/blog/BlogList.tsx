"use client";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import { ClearButton } from "@/components/ui/ClearButton";
import { SearchInput } from "@/components/ui/SearchInput";

import { CiShoppingTag } from "react-icons/ci";

async function fetchBlogList() {
  const response = await fetch("/data/blog_list.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function BlogList() {
  const [displayCount, setDisplayCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: blogList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogList"],
    queryFn: fetchBlogList,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // Filtered blog list based on search query
  const filteredBlogs = blogList.filter(
    //@ts-ignore
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags &&
        // @ts-ignore
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  //@ts-ignore
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-xl text-bold text-left">Blog List</h2>
        <div className="search-bar flex flex-col md:flex-row  justify-between gap-2">
          <SearchInput
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
          <ClearButton onClick={clearSearch}>Clear</ClearButton>
        </div>
      </div>
      <br />

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
        className="flex flex-col gap-4"
      >
        {/* @ts-ignore */}
        {filteredBlogs.slice(0, displayCount).map((blog) => (
          <TimelineItem key={blog.title + blog.author + blog.date}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Link href={blog.link}>
                <div key={blog.title} className="flex flex-col">
                  <h3 className="link-hover font-bold">{blog.title}</h3>

                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex md:flex-row gap-4 py-2">
                      <p>{blog.author}</p>
                      <p className="italic">{blog.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pb-2">
                    {/* @ts-ignore */}
                    {blog.tags.map((tag) => (
                      <p
                        className="flex flex-row items-center gap-2 px-2 rounded-full  hover:bg-orange-100"
                        key={Date.now() + Math.random()}
                      >
                        <CiShoppingTag />
                        {tag}
                      </p>
                    ))}
                  </div>
                  <p className="leading-5 text-hover">{blog.brief}</p>
                </div>
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {filteredBlogs.length > displayCount && (
        <div className="flex justify-center items-center">
          <Button
            onClick={() =>
              setDisplayCount((prevCount) =>
                Math.min(prevCount + 5, filteredBlogs.length),
              )
            }
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
          >
            More
          </Button>
        </div>
      )}
    </div>
  );
}