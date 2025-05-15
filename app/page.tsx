'use client'

import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import BlogCards from './components/BlogCards'
import CTA from './components/CTA'
import Footer from './components/Footer'
import MatrixRain from './components/MatrixRain'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900">
      <MatrixRain />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <BlogCards />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
