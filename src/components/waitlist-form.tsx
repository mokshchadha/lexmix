'use client'

import { useActionState, useState } from 'react'
import { submitWaitlist } from '@/app/actions/submit-waitlist'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Modal } from '@/components/ui/modal'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}


interface WaitlistFormProps {
  variant?: 'inline' | 'modal'
  triggerClassName?: string
  triggerText?: React.ReactNode
}

const initialState = {
  success: false,
  message: '',
}

export function WaitlistForm({ variant = 'inline', triggerClassName, triggerText = 'Join Waitlist' }: WaitlistFormProps) {
  const [state, action, isPending] = useActionState(submitWaitlist, initialState as any)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const FormContent = (
    <form action={action} className="flex flex-col gap-4 w-full">
      {!isModalOpen && variant === 'inline' && (
         /* If inline and not in modal (Wait, if inline, isModalOpen is false anyway). 
            If variant is inline, we renders this form directly. 
            If variant is modal, we render this form inside the Modal.
          */
          null
      )}
      
      {variant === 'modal' && (
         <p className="text-sm text-zinc-600 dark:text-zinc-400 -mt-2 mb-2">
            Enter your details to request early access.
          </p>
      )}

      <div>
        <label htmlFor="name" className="sr-only">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Your Name"
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          placeholder="Contact Number"
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm text-center">
          {state.message || state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "flex w-full items-center justify-center rounded-lg bg-black px-8 py-3 font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200 mt-2",
          isPending && "cursor-not-allowed opacity-70"
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : (
          "Request Access"
        )}
      </button>
      <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
        Exclusive to verified legal professionals.
      </p>
    </form>
  )

  if (state?.success) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-xl font-serif font-semibold text-zinc-900 dark:text-zinc-50">
          Welcome to the Inner Circle
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {state.message}
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          We will review your credentials and contact you shortly.
        </p>
      </div>
    )
  }

  if (variant === 'inline') {
      return FormContent
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
            "w-full rounded-lg bg-black px-8 py-4 font-medium text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200",
            triggerClassName
        )}
      >
        {triggerText}
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Join the Exclusive Waitlist"
      >
        {FormContent}
      </Modal>
    </>
  )
}
