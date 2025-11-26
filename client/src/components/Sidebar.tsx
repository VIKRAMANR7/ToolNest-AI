import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import { Crown, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems } from "../assets/assets";

interface SidebarProps {
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
}

export default function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!user) return null;

  const isPremiumUser = user.publicMetadata?.plan === "premium";

  return (
    <>
      {sidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:static ${
          sidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          onClick={() => setSidebar(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 md:hidden"
          aria-label="Close sidebar"
        >
          <X className="size-5" />
        </button>

        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="mb-3 h-16 w-16 rounded-full ring-2 ring-gray-100"
            />

            <h2 className="font-semibold text-gray-900">{user.fullName || user.username}</h2>

            <Protect
              plan="premium"
              fallback={
                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">Free Plan</p>
              }
            >
              <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                <Crown className="size-3" />
                Premium Plan
              </p>
            </Protect>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {navItems.map(({ to, label, Icon, end, premium }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-[#3c81f6] to-[#9234ea] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`size-5 ${isActive ? "text-white" : "text-gray-500"}`} />

                    <span className="flex-1">{label}</span>

                    {/* Premium badge for locked tools */}
                    {premium && !isPremiumUser && !isActive && (
                      <Crown className="size-4 text-amber-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => openUserProfile()}
              className="flex flex-1 items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
            >
              <img
                src={user.imageUrl}
                alt={user.fullName || "User"}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1 text-left">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {user.fullName || user.username}
                </h3>
                <p className="text-xs text-gray-500">View profile</p>
              </div>
            </button>

            <button
              onClick={() => void signOut()}
              className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
