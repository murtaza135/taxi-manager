export function DataGridCard() {
  return (
    <div className="h-full min-h-[27rem] rounded-lg overflow-hidden bg-achromatic-light dark:bg-achromatic-dark">
      <div className="h-28 mb-16 relative">
        <img src="/src/assets/images/sea.jpg" alt="sea" className="object-cover object-center h-full w-full" />
        <img src="/src/assets/images/person.jpg" alt="person" className="h-32 w-32 object-cover object-center rounded-full absolute top-full left-1/2 -translate-x-16 -translate-y-16 border-0 border-achromatic-light dark:border-achromatic-dark" />
      </div>

      <div className="px-6 pb-10 pt-4 space-y-6">
        <div className="text-center">
          <p className="text-2xl font-semibold">Jane Doe</p>
          <p className="text-achromatic-dark/50 dark:text-achromatic-light/50">AB20 1CD</p>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">Email</p>
            <p>jane-doe@test.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">Phone Number</p>
            <p>01234567890</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-achromatic-dark/50 dark:text-achromatic-light/50">Hire Contract</p>
            <p>ABC123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
