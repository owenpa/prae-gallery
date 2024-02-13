export default function ConfirmationModal (): JSX.Element {
  return (
    <dialog id='confirmation-modal'>
        <h1 id="display-image-name" className="text-xl"></h1>
        <form>
          <label htmlFor="image-name">Are you sure you want to delete this image? Re-enter the filename to proceed.</label>
          <input className="bg-slate-700"></input>
          <button className="bg-red-500 text-white p-3" type="submit">Submit</button>
        </form>
      </dialog>
  )
}
