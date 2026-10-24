'use client'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Suspense } from 'react'

function CardContent() {
  const searchParams = useSearchParams()
  const data = searchParams.get('data')

  // Parse the data safely
  const { name, stacks } = data ? JSON.parse(decodeURIComponent(data)) : { name: '', stacks: [] }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="bg-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">{name}&apos;s Tech Stack</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
          {stacks.map((stack: { name: string; icon: string }) => (
            <div key={stack.name} className="flex flex-col items-center">
              <i className={`${stack.icon} text-5xl mb-2 tech-icon`}></i>
              <span className="text-sm font-medium text-white">{stack.name}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href)
              const text = encodeURIComponent(`Check out ${name}'s tech stack!`)
              window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
            }}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Share on Twitter
          </button>
          
          <button
            onClick={() => {
              const url = encodeURIComponent(window.location.href)
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
            }}
            className="py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Share on LinkedIn
          </button>
        </div>

        {/* Fixed Link: removed the nested <a> tag */}
        <Link href="/" className="block mt-8 text-center text-white hover:underline">
          Create another card
        </Link>
      </motion.div>
    </div>
  )
}

export default function CardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading card...</div>}>
      <CardContent />
    </Suspense>
  )
}