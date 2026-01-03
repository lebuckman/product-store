import { useEffect, useState } from "react";
import { PaletteIcon } from "lucide-react";
import THEMES from "../configs/themes";

function ThemeSelector() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "dim"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-1"
            >
                <PaletteIcon className="size-4" />
                <span className="hidden sm:inline">Theme</span>
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
            >
                {THEMES.map((t) => (
                    <li key={t}>
                        <button
                            onClick={() => setTheme(t)}
                            className={`flex justify-between ${
                                theme === t
                                    ? "bg-primary text-primary-content"
                                    : ""
                            }`}
                        >
                            <span className="capitalize">{t}</span>
                            <div
                                className="flex gap-0.5 bg-transparent"
                                data-theme={t}
                            >
                                <span className="size-4 rounded-sm bg-primary shadow-sm shadow-gray-700" />
                                <span className="size-4 rounded-sm bg-secondary shadow-sm shadow-gray-700" />
                                <span className="size-4 rounded-sm bg-accent shadow-sm shadow-gray-700" />
                                <span className="size-4 rounded-sm bg-neutral shadow-sm shadow-gray-700" />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThemeSelector;
