'use client'

interface YouTubeProps {
  id: string
  title?: string
}

export default function SamAltmanBurnoutYouTubeVideo({
  id,
  title = 'YouTube video player',
}: YouTubeProps) {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}
