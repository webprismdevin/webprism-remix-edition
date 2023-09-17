export default function ExitPreview() {
    return (
      <div className="fixed z-50 bottom-0 right-0">
        <form className="pointer-events-auto" action="/resource/preview" method="POST">
          <button className="bg-black p-4 font-bold text-white" type="submit">
            Exit Preview Mode
          </button>
        </form>
      </div>
    )
  }