
const Hero = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center text-white h-4/5'>
      <h1 className="text-6xl px-70 text-center">Unlimited movies, shows, and more</h1>
      <p className="text-lg">Starts at ₹149 Cancel at any time.</p>
      <p className="text-lg">Ready to watch? Enter your email to create or restart your membership.</p>
      <div className="flex gap-10">
        <input className = "rounded-sm border-2 border-white px-4 text-white py-4 px-15 bg-black/50 "  type="text" placeholder='Enter Email'/>
        <button className="bg-red-700 px-4 rounded-sm text-white hover:bg-red-800 py-2 px-4">Get Started </button>
      </div>
    </div>
  )
}

export default Hero
