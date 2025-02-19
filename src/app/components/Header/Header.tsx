'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { menuItems } from './menuItems'

// Types
interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    className?: string;
  }
  

// Composant NavButton
const NavButton: React.FC<NavButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: `
      relative
      bg-gradient-to-br from-violet-600 to-emerald-400
      text-white
      rounded-xl
      backdrop-blur-xl
      border border-white/10
      transition-all duration-300
      shadow-[0_0_20px_rgba(124,58,237,0.3)]
      hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]
      hover:border-emerald-400/30
      hover:scale-[1.02]
      active:scale-[0.98]
      overflow-hidden
      before:absolute
      before:inset-0
      before:bg-gradient-to-br
      before:from-violet-500/20
      before:to-emerald-400/20
      before:opacity-0
      hover:before:opacity-100
      before:transition-opacity
      before:duration-300
      after:absolute
      after:inset-0
      after:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.3),transparent)]
      after:translate-x-[-200%]
      hover:after:translate-x-[200%]
      after:transition-transform
      after:duration-700
      after:ease-out
      font-medium
    `,
    secondary: `
      relative
      text-emerald-400
      hover:text-white
      hover:scale-[1.02]
      transition-all
      duration-300
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-0
      after:bg-gradient-to-r
      after:from-violet-600
      after:to-emerald-400
      hover:after:w-full
      after:transition-all
      after:duration-300
    `
  }

  const sizes = {
    sm: "px-4 py-1.5 text-sm min-w-[100px] rounded-lg",
    md: "px-6 py-2 text-base min-w-[130px] rounded-lg",
    lg: "px-8 py-2.5 text-lg min-w-[150px] rounded-lg"
  }

  return (
    <button
      {...props}
      className={`
        font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}
  

// Composant Header principal
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1)
  const [hasScrolled, setHasScrolled] = useState(false)
  const submenuRefs = useRef<(HTMLDivElement | null)[]>([])

  // Ajouter l'effet de scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setHasScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gestion de la navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSubmenu) {
        switch (e.key) {
          case 'Escape':
            setActiveSubmenu(null)
            break
          case 'ArrowDown':
            e.preventDefault()
            setFocusedItemIndex(prev => (prev < submenuRefs.current.length - 1 ? prev + 1 : 0))
            break
          case 'ArrowUp':
            e.preventDefault()
            setFocusedItemIndex(prev => (prev > 0 ? prev - 1 : submenuRefs.current.length - 1))
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSubmenu])

  // Focus automatique lors de la navigation au clavier
  useEffect(() => {
    if (focusedItemIndex >= 0) {
      submenuRefs.current[focusedItemIndex]?.focus()
    }
  }, [focusedItemIndex])

  const handleMouseEnter = (itemName: string) => {
    setActiveSubmenu(itemName)
    setFocusedItemIndex(-1)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
    setFocusedItemIndex(-1)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      hasScrolled ? 'backdrop-blur-xl bg-black/70' : ''
    }`}>
      <nav className={`transition-all duration-300 border-b border-white/10 ${
        hasScrolled ? 'bg-transparent' : 'backdrop-blur-md bg-black/30'
      }`} role="navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            hasScrolled ? 'h-14 sm:h-16 md:h-20' : 'h-16 sm:h-20 md:h-24'
          }`}>
            <div className="flex-shrink-0">
              <Image 
                src="/images/logo/logo_ikki.webp" 
                alt="Ikki Logo"
                width={150}
                height={150}
                className={`w-auto transition-all duration-300 ${
                  hasScrolled ? 'h-10 sm:h-12 md:h-16' : 'h-12 sm:h-16 md:h-20'
                }`}
                priority
              />
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className="py-4 px-2 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFA3] focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                    aria-expanded={activeSubmenu === item.name}
                    aria-haspopup={!!item.subItems}
                    role="menuitem"
                  >
                    <span className="flex items-center">
                      {item.name}
                      {item.subItems && (
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </span>
                  </a>

                  <AnimatePresence>
                    {item.subItems && activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 mt-1 w-64 rounded-xl glass-deep shadow-lg shadow-black/20 border border-white/10"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                      >
                        <div 
                          className="py-1 rounded-xl backdrop-blur-xl bg-black/40"
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.subItems.map((subItem, index) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className={`
                                submenu-item
                                block px-6 py-2.5 text-sm text-gray-300 
                                hover:text-white hover:bg-white/5
                                transition-all duration-200 ease-out
                                focus:outline-none focus:bg-white/5 focus:text-white
                                ${index === focusedItemIndex ? 'bg-white/5 text-white' : ''}
                                first:rounded-t-lg last:rounded-b-lg
                                pl-8
                              `}
                              role="menuitem"
                              tabIndex={activeSubmenu === item.name ? 0 : -1}
                            >
                              <span className="relative flex items-center">
                                {subItem.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex">
              <NavButton 
                variant="primary" 
                size="md"
                className="font-medium tracking-wide"
              >
                Se Connecter
              </NavButton>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <div className="sm:flex hidden">
                <NavButton 
                  variant="primary" 
                  size="sm"
                  className="font-medium tracking-wide"
                >
                  Se Connecter
                </NavButton>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
                aria-expanded={isMenuOpen}
                aria-label="Menu principal"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { opacity: 1, height: "auto" },
            closed: { opacity: 0, height: 0 }
          }}
          className="lg:hidden overflow-hidden bg-black/50 backdrop-blur-lg"
        >
          <div className="px-4 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.name} className="py-1">
                <button
                  onClick={() => {
                    if (item.subItems) {
                      setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-md"
                >
                  <span>{item.name}</span>
                  {item.subItems && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeSubmenu === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                
                {item.subItems && activeSubmenu === item.name && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-white/10">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-md"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-2 sm:hidden">
              <NavButton 
                variant="primary" 
                size="md" 
                className="w-full font-medium tracking-wide"
              >
                Se Connecter
              </NavButton>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  )
}

export default Header
