"use client"

import React, { MouseEvent, useEffect, useState } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all animate-rainbow",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-sm outline-none focus-visible:ring-[3px] aria-invalid:border-destructive",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:scale-105 active:scale-95",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default:
          "border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-primary-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)] hover:brightness-110 dark:bg-[linear-gradient(#2a1515,#2a1515),linear-gradient(#2a1515_50%,rgba(42,21,21,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] dark:border-t dark:border-[rgba(185,114,114,0.35)]",
        outline:
          "border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-[length:200%] text-accent-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:[filter:blur(0.75rem)] hover:brightness-110 dark:bg-[linear-gradient(#2a1515,#2a1515),linear-gradient(#2a1515_50%,rgba(42,21,21,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] dark:border-t dark:border-[rgba(185,114,114,0.35)]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface RainbowButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean
  rippleColor?: string
  rippleDuration?: string
  href?: string
  target?: string
}

const RainbowButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, rippleColor = "#ffffff", rippleDuration = "600ms", href, target, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : (href ? "a" : "button")
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      createRipple(event)
      onClick?.(event as React.MouseEvent<HTMLButtonElement>)
    }

    const createRipple = (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    useEffect(() => {
      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1]
        const timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          )
        }, parseInt(rippleDuration))
        return () => clearTimeout(timeout)
      }
    }, [buttonRipples, rippleDuration])

    const buttonOnlyProps = ["disabled", "form", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "type"]
    const filteredProps = href ? Object.fromEntries(
      Object.entries(props).filter(([key]) => !buttonOnlyProps.includes(key) && !key.startsWith("onForm"))
    ) : props

    const componentProps = href ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : {}

    return (
      <Comp
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }), "overflow-hidden")}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        onClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(componentProps as any)}
        {...filteredProps}
      >
        {children}
        {buttonRipples.map((ripple) => (
          <span
            className="animate-rippling absolute rounded-full opacity-30 pointer-events-none"
            key={ripple.key}
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor: rippleColor,
              transform: `scale(0)`,
              // @ts-expect-error idk
              "--duration": rippleDuration,
            }}
          />
        ))}
      </Comp>
    )
  }
)

RainbowButton.displayName = "RainbowButton"

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps }