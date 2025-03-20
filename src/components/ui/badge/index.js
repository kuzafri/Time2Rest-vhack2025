import { cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-regular transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        warn: "border-transparent text-xs px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full",
        destructive:
          "border-transparent text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
