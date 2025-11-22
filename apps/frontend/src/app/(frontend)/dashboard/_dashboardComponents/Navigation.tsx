"use client";

import { useState } from "react";
import {
  Home,
  BarChart3,
  Settings,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronExpand,
  Database,
  Upload,
  Download,
  Wrench,
  Cog,
  Blocks,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Job Listings",
    icon: FileText,
    href: "/dashboard/jobs",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    name: "Data",
    icon: Database,
    href: "/dashboard/data",
    subItems: [
      {
        name: "Upload",
        icon: Upload,
        href: "/dashboard/data/upload",
      },
      {
        name: "Download",
        icon: Download,
        href: "/dashboard/data/download",
      },
    ],
  },
  {
    name: "Management",
    icon: Cog,
    href: "/dashboard/management",
    subItems: [
      {
        name: "Scrape Management",
        icon: Wrench,
        href: "/dashboard/management/scrape",
      },
      {
        name: "Scrape Now",
        icon: Zap,
        href: "/dashboard/management/scrape-now",
      },
      {
        name: "New Configuration",
        icon: Blocks,
        href: "/dashboard/management/scrape-configuration",
      },
    ],
  },
  {
    name: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
  },
  {
    name: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

interface NavigationProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Navigation = ({
  isOpen,
  isCollapsed = false,
  onToggleCollapse,
}: NavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (name: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedItems.has(item.name);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div key={item.name}>
        {hasSubItems ? (
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 py-2 text-sm font-medium hover:hoverbg dark:hover:bg-hover-bg-dark hover:text-accent-foreground cursor-pointer",
              level > 0 && "ml-4 w-[calc(100%-1rem)]",
              isCollapsed && level === 0 && "justify-center px-2"
            )}
            onClick={() => toggleExpanded(item.name)}
          >
            <item.icon className="mr-0 h-4 w-4" />
            {!isCollapsed && (
              <span className="flex-1 text-left">{item.name}</span>
            )}
            {!isCollapsed &&
              (isExpanded ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              ))}
          </Button>
        ) : (
          <Link href={item.href} className="cursor-pointer">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 py-2 text-sm font-medium hover:hoverbg dark:hover:bg-hover-bg-dark hover:text-accent-foreground cursor-pointer",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                isCollapsed && level === 0 && "justify-center px-2"
              )}
            >
              <item.icon className="mr-0 h-4 w-4" />
              {!isCollapsed && (
                <span className="flex-1 text-left">{item.name}</span>
              )}
            </Button>
          </Link>
        )}
        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="ml-4">
            {item.subItems!.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        "bg-card border-r border-border p-4 absolute top-[61px] left-0 lg:relative lg:top-0 z-50 h-full ",
        isCollapsed ? "w-16" : "w-64",
        "hidden lg:block",
        isOpen && "block"
      )}
    >
      <div className="space-y-2 flex flex-col justify-between h-full">
        <div>{navItems.map((item) => renderNavItem(item))}</div>
        {onToggleCollapse && (
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleCollapse}
            className="mt-4 justify-center"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
