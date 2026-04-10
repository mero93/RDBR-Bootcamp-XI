import { Button } from '@/components/ui/button';

export default function Home() {
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
    </main>
  );
}
