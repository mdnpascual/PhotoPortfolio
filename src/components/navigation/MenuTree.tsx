import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
  children?: Omit<MenuItem, "children">[];
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Gallery",
    path: "/gallery",
    children: [
      { label: "Birds",     path: "/gallery" },
      { label: "Wildlife",  path: "/gallery" },
      { label: "Landscape", path: "/gallery" },
      { label: "People",    path: "/gallery" },
    ],
  },
  { label: "Techniques",      path: "/techniques" },
  { label: "Post-Processing", path: "/post-processing" },
  { label: "Gear",            path: "/gear" },
  { label: "About",           path: "/about" },
  { label: "Contact",         path: "/contact" },
];

interface MenuTreeProps {
  onClose: () => void;
}

export default function MenuTree({ onClose }: MenuTreeProps) {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  function isActive(path: string) {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  }

  function handleClick(path: string) {
    onClose();
    navigate(path);
  }

  return (
    <nav className="flex flex-col gap-1 pt-20 pb-8 px-6">
      {MENU_ITEMS.map((item) => (
        <div key={item.label}>
          <button
            onClick={() => handleClick(item.path)}
            className={`w-full text-left py-2.5 text-sm tracking-widest uppercase transition-colors ${
              isActive(item.path) ? "text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {item.label}
          </button>

          {item.children && (
            <div className="ml-5 flex flex-col gap-0.5 mb-1">
              {item.children.map((child) => (
                <button
                  key={child.label}
                  onClick={() => handleClick(child.path)}
                  className="w-full text-left py-1.5 text-xs tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors"
                >
                  {child.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
