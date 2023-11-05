export default function ExitPreview() {

  return (
    <div className="fixed z-50 top-4 right-2 md:right-4 rounded-full overflow-hidden">
      <form
        className="pointer-events-auto"
        action="/resource/preview"
        method="POST"
      >
        <button
          className="bg-black px-4 py-2 font-bold text-white text-xs"
          type="submit"
        >
          Exit Preview
        </button>
      </form>
    </div>
  );
}
