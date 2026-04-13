import { Dialog, DialogOverlay } from '../ui/dialog';

type ProfileDialogProperties = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};

export default function ProfileDialog({ open, onOpenChange }: ProfileDialogProperties) {
  console.log('opening Profile Dialog');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay onPointerDown={(event) => event.stopPropagation} />
      </Dialog>
    </>
  );
}
