'use client'

import React from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { WaitlistForm } from '@/components/waitlist-form'
import { ParticlesBackground } from '@/components/particles-background'

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-medium text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200"
          >
            <span className="flex h-2 w-2 rounded-full bg-black dark:bg-white mr-2"></span>
            Exclusive for Indian Legal Professionals
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl font-bold tracking-tight text-black dark:text-white sm:text-7xl mb-8"
          >
            Balance the Scales of{' '}
            <span className="italic relative z-10">Life & Law</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10"
          >
            The first vertically integrated ecosystem designed exclusively for
            verified lawyers, judges, and legal scholars.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <WaitlistForm
              variant="modal"
              triggerClassName="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:-translate-y-1 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              triggerText={
                <>
                  Join Waitlist <ChevronRight className="ml-2 h-4 w-4" />
                </>
              }
            />
            <Link
              href="#problem"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-black/10 bg-white px-8 py-4 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-black dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Why Lex Match?
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Particle Background */}
      <ParticlesBackground />
      
      {/* Decorative background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
      ></motion.div>
    </section>
  )
}
