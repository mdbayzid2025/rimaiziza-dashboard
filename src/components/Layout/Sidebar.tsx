import Cookies from "js-cookie";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../lib/SidebarItems";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// ───────────────── Children ───────────────────────────────
 // Types
// interface SidebarItemChild {
//   path: string;
//   icon?: React.ReactNode;
//   label: string;
// }


// ────────────────────────────────────────────────
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  
  // const isChildActive = (children?: SidebarItemChild[]) =>
  //   children?.some((child) => isActive(`/${child.path}`)) ?? false;

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "fixed  bg-white overflow-hidden border-r border-neutral-200 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950",
        collapsed ? "w-16" : "w-70"
      )}
    >
      <div className="h-screen flex flex-col">
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
            // onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <FiChevronRight className="h-4 w-4" />
            ) : (
              <FiChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Main Navigation */}
        <ScrollArea className=" h-full px-3 py-4 mb-auto">
          <nav className="space-y-2!">
            {sidebarItems.map((item, index) => {
              const itemPath = `/${item.path}`;
              const isItemActive = isActive(itemPath);
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
        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800 ">
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
      </div>

    </aside>
  );
}