import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

const ldrVariants = cva('', {
	variants: {
		variant: {
			plainLdr: `relative flex items-center justify-center h-[5px] w-20 overflow-hidden rounded-[calc(5px_/_2)] before:content-[''] before:absolute before:h-full before:w-full before:bg-[black] dark:before:bg-[white] before:opacity-10 before:transition-[background-color] before:duration-[0.3s] before:ease-[ease] before:left-0 before:top-0 after:content-[''] after:h-full after:w-full after:animate-plainHorLdr-lft-rgt after:-translate-x-full after:bg-[black] dark:bg-[white] after:transition-[background-color] after:duration-[0.3s] after:ease-[ease] after:rounded-[calc(5px_/_2)]`,
		},
		size: {
			default: 'h-2 px-4 py-2',
			sm: 'h-2 rounded-md px-3',
			lg: 'h-4 rounded-md px-8',
		},
	},
	defaultVariants: {
		variant: 'plainLdr',
		size: 'default',
	},
});

interface LdrPropsType extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof ldrVariants> {}

export const Ldr = React.forwardRef<HTMLDivElement, LdrPropsType>(({ className, variant, size, ...props }, ref) => {
	return <div className={cn(ldrVariants({ variant, size, className }))} ref={ref} {...props}></div>;
});

Ldr.displayName = 'Ldr';
