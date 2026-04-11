import { Button } from '@/components/ui/button';
import { Icon, IconPathRegistry, isIconName } from '@/components/ui/Icon';
import RatingStar from '@/components/ui/RatingStar';

export default function Home() {
  const icons = Object.keys(IconPathRegistry);

  console.log('icons', icons.length, icons);

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center gap-5 p-20">
      <div className="flex gap-5">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-5">
        <Button disabled>Primary</Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {icons.map((icon) => isIconName(icon) && <Icon name={icon} key={icon} className={'text-greyscale-700'}></Icon>)}
      </div>
      <div className="flex flex-wrap gap-1">
        <RatingStar /> <RatingStar percentage={50} className="text-greyscale-50 hover:text-gray-100" />{' '}
        <RatingStar percentage={0} className="text-gray-300" />
      </div>
    </main>
  );
}
