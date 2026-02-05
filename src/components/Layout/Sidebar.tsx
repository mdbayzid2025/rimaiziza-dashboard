import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { sidebarItems } from "../../lib/SidebarItems";

// ────────────────────────────────────────────────
// Types
interface SidebarItemChild {
  path: string;
  icon?: React.ReactNode;
  label: string;
}


// ────────────────────────────────────────────────
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Helper: check if any child is active → highlight parent
  const isChildActive = (children?: SidebarItemChild[]) =>
    children?.some((child) => isActive(`/${child.path}`)) ?? false;

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "fixed h-screen flex-col border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950",
        collapsed ? "w-16" : "w-70"
      )}
    >
      {/* Header / Logo + Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            {/* Replace with your logo */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              TL
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                TradeLink
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Network
              </span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <FiChevronRight className="h-4 w-4" />
          ) : (
            <FiChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 mb-auto">
        <nav className="space-y-2!">
          {sidebarItems.map((item, index) => {
            const hasChildren = !!item.children;
            const itemPath = item.path ? `/${item.path}` : `/${item.key}`;
            const isItemActive = isActive(itemPath) || isChildActive(item.children);

            if (hasChildren) {
              return (
                <Collapsible key={item.key} defaultOpen={isItemActive}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            collapsed ? "justify-center" : "justify-between",
                            isItemActive
                              ? "bg-primary text-white"
                              : "border border-black/20 text-black hover:bg-neutral-100"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && (
                              <span className="flex-shrink-0">
                                {item.icon}
                              </span>
                            )}
                            {!collapsed && <span>{item.label}</span>}
                          </div>
                          {!collapsed && (
                            <FiChevronRight
                              className={cn(
                                "h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90"
                              )}
                            />
                          )}
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>

                  <CollapsibleContent className="mt-1 space-y-1 pl-4">
                    {item.children.map((child, childIndex) => {
                      const childPath = `/${child.path}`;
                      const isChildItemActive = isActive(childPath);

                      return (
                        <TooltipProvider key={child.path}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link                               
                                 data-aos="fade-up-left"
                                data-aos-delay={childIndex * 100}
                                to={childPath}
                                className={cn(
                                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                  collapsed
                                    ? "justify-center min-h-[42px]"
                                    : "justify-start",
                                  isChildItemActive
                                    ? "bg-primary text-white"
                                    : "border border-black/20 text-black hover:bg-neutral-100"
                                )}
                              >
                                {child.icon && (
                                  <span className="flex-shrink-0">
                                    {child.icon}
                                  </span>
                                )}
                                {!collapsed && <span>{child.label}</span>}
                              </Link>
                            </TooltipTrigger>
                            {collapsed && (
                              <TooltipContent side="right">
                                {child.label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            // ────────────────────────────────────────────────
            // Simple item (no children)
            return (
              <TooltipProvider key={item.key}  >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={itemPath}
                      className={cn(
                        "group relative mb-2! flex w-full items-center gap-3 rounded-lg transition-all duration-200 min-h-[44px]",
                        collapsed
                          ? "justify-center px-2"
                          : "justify-start px-3 py-2.5",
                        isItemActive
                          ? "bg-primary text-white!"
                          : "border border-black/20 text-black! hover:bg-primary hover:text-white!"
                      )}
                      data-aos="fade-up-right"
                      data-aos-delay={index * 100}
                    >
                      {item.icon && (
                        <span className="flex-shrink-0">{item.icon}</span>
                      )}
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="border-t border-neutral-200 p-3 dark:border-neutral-800 mt-25">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button

                onClick={handleLogout}
                className={cn(
                  "w-full justify-start gap-3 bg-transparent! text-black! border-2! border-black/50!",
                  collapsed && "justify-center px-2"
                )}
              >
                <FiLogOut className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>Log Out</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Log Out</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}