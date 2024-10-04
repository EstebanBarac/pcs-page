export default function TestVideo() {
    return (
      <div>
        <video controls width="250">
          <source src="/pc-build.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>
    )
  }