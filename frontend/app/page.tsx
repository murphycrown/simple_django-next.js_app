'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TechStackSelector } from '../components/tech-stack-selector'
import { useRouter } from 'next/navigation'
import { generateCard, saveCard } from '../utils/api'

// ... existing imports and component setup


export default function Home() {
  const [name, setName] = useState('')
  const [selectedStacks, setSelectedStacks] = useState<Array<{ name: string; icon: string }>>([])
  const router = useRouter()



const handleGenerateCard = async () => {
  if (name && selectedStacks.length > 0) {
    try {
      const result = await generateCard(name, selectedStacks);
      console.log(result.message);
      const encodedData = encodeURIComponent(JSON.stringify({ name, stacks: selectedStacks }));
      router.push(`/card?data=${encodedData}`);
    } catch (error) {
      console.error('Error generating card:', error);
    }
  }
}
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="max-w-4xl w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-center text-white mb-8">Tech Stack Generator</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 text-xl bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <TechStackSelector onStackSelect={setSelectedStacks} />
        <motion.button
          className="w-full py-4 px-8 text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          onClick={handleGenerateCard}
          disabled={!name || selectedStacks.length === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Tech Stack Card
        </motion.button>
      </motion.div>
    </main>
  )
}