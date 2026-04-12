import { Button } from './ui/button';
import { Icon } from './ui/Icon';

export default function Header() {
  return (
    <header className="border-greyscale-200 flex w-full justify-center border-b py-6 pb-[calc(1.5rem-1px)]">
      <div className="flex w-full max-w-391.5 items-center justify-between">
        <Button variant="icon">
          <Icon name="rocket" size={30} />
        </Button>
        <div className="flex items-center gap-9">
          <Button variant="nav" className="h-15">
            <Icon name="sparkle" size={26} />
            Browse Courses
          </Button>
          <div className="flex items-center gap-3.75">
            <Button variant="outline" className="w-28.5">
              Log In
            </Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
