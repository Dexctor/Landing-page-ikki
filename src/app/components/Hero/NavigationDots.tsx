interface NavigationDotsProps {
  total: number
  current: number
  onSelect: (index: number) => void
  onKeyPress: (e: React.KeyboardEvent, index: number) => void
}

export const NavigationDots = ({ 
  total, 
  current, 
  onSelect, 
  onKeyPress 
}: NavigationDotsProps) => (
  <div 
    className="absolute -bottom-4 md:-bottom-6 left-1/2 transform 
              -translate-x-1/2 flex gap-3 z-20"
    role="tablist"
    aria-label="Navigation des slides"
  >
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        onKeyDown={(e) => onKeyPress(e, index)}
        role="tab"
        aria-selected={current === index}
        aria-label={`Aller au slide ${index + 1}`}
        tabIndex={0}
        className={`h-1.5 rounded-full transition-all duration-500 ease-out
                  focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 
                  focus:ring-offset-black outline-none cursor-pointer
                  ${current === index 
                    ? 'bg-emerald-400 w-16 md:w-20' 
                    : 'bg-white/20 w-8 md:w-10 hover:bg-white/40 hover:w-12 md:hover:w-14'}`}
      />
    ))}
  </div>
) 