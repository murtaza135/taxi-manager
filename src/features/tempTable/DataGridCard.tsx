export function DataGridCard() {
  return (
    <div className="h-full min-h-[27rem] rounded-lg overflow-hidden bg-achromatic-light dark:bg-achromatic-dark">
      <div className="h-32 mb-16 relative">
        <img src="/src/assets/images/sea.jpg" alt="sea" className="object-cover object-center h-full w-full" />
        <img src="/src/assets/images/person.jpg" alt="person" className="h-32 w-32 object-cover object-center rounded-full absolute top-full left-1/2 -translate-x-16 -translate-y-16" />
      </div>

      <div className="p-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, reiciendis!
      </div>
    </div>
  );
}
