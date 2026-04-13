import { useModalStates } from '@/providers/ModalProvider';

import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Heading } from '../ui/heading';

type RegistrationDialogProperties = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};

export default function RegistrationDialog({ open, onOpenChange }: RegistrationDialogProperties) {
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
        <Heading variant="h1"> Inside Registration Dialog </Heading>
        <Button onClick={() => openModal('login')}>Switch to login</Button>
      </DialogContent>
    </Dialog>
  );
}
