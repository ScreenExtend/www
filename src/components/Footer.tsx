import { useTheme } from "react-daisyui";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer>
      <div className={`border-t border-${theme == "light" ? "black/20" : theme == "text-dark" ? "white/20" : "black/20 dark:border-white/20"} px-8 py-4 text-center lg:px-40 text-sm mt-20 text-${theme == "light" ? "black" : theme == "text-dark" ? "white" : "black dark:text-white"}`}>
        © 2025 Sarvesh Madullapalli. All rights reserved.
      </div>
    </footer>
  );
}
