"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "@mynaui/icons-react";

function CaseFilterDropdown() {
  const [selectedFilter, setSelectedFilter] = useState("All Cases");

  const filters = [
    "All Cases",
    "Open Cases",
    "Closed Cases",
    "High Priority",
    "Medium Priority",
    "Low Priority",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="newly_secondary">
          Filter by: {selectedFilter} <Filter className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Cases</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filters.map((filter) => (
          <DropdownMenuCheckboxItem
            key={filter}
            checked={selectedFilter === filter}
            onCheckedChange={() => setSelectedFilter(filter)}
          >
            {filter}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { CaseFilterDropdown };
