import { useModalStates } from '@/providers/ModalProvider';

import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Heading } from '../ui/heading';

type LoginDialogProperties = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};

export default function LoginDialog({ open, onOpenChange }: LoginDialogProperties) {
  const { closeModal, openModal } = useModalStates();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90%] flex-col items-center sm:max-w-150"
        onEscapeKeyDown={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onPointerDownOutside={(event) => {
          event.preventDefault();
          closeModal();
        }}
      >
        <Heading variant="h1"> Inside Login Dialog </Heading>
        <Button onClick={() => openModal('register')}>Switch to Register</Button>
      </DialogContent>
    </Dialog>
  );
}
