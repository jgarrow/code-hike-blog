const title = "From Markdown to Video"
const description = "Animated code walkthroughs with Code Hike and Remotion"

export default function Page() {
  return (
    <div className="prose text-zinc-50">
      <div
        className="flex justify-between flex-col p-16"
        style={{ width: 1200, height: 628 }}
      >
        <div className="flex-1 flex items-start">
          <span className="flex items-center text-4xl font-bold text-accent-foreground/90">
          </span>
          <div></div>
        </div>
        <h1 className="text-6xl text-pretty m-0 pr-24">{title}</h1>
        <h2 className="text-accent-foreground/90 text-pretty text-4xl m-0 flex-1  pr-24">
          <div className="pt-10">{description}</div>
        </h2>
      </div>
    </div>
  )
}
