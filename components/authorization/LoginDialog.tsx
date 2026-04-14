import { RefreshCcwDot } from 'lucide-react';
import { useState } from 'react';

import { CustomForm } from '@/components/ui/forms/CustomForm';
import { CustomInput } from '@/components/ui/forms/CustomInput';
import { useModalStates } from '@/providers/ModalProvider';
import { LoginFormSchema } from '@/types/authorization-schemas';
import { SchemaData } from '@/types/schema-registry';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Heading } from '../ui/heading';

type LoginDialogProperties = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};

const formKey = 'login-from';

export default function LoginDialog({ open, onOpenChange }: LoginDialogProperties) {
  const { closeModal, openModal } = useModalStates();
  const [formValid, setFormValid] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (loginData: SchemaData) => {
    console.log('handling submit');
    const parsed = LoginFormSchema.safeParse(loginData);

    if (parsed.success) {
      try {
        setVerifying(true);

        /// TODO: replace with actual api call
        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 3000)
        );

        console.log('data', parsed.data);
      } finally {
        setVerifying(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90%] flex-col items-center gap-0 p-12.5 sm:max-w-115" onClose={closeModal}>
        <DialogHeader>
          <DialogTitle>
            <Heading variant="h2">Welcome Back</Heading>
          </DialogTitle>
          <DialogDescription className="text-sm">Log in to continue your learning</DialogDescription>
        </DialogHeader>

        <CustomForm
          id={formKey}
          schemaKey={'LoginFormSchema'}
          onSubmit={handleSubmit}
          onValidationChange={setFormValid}
        >
          <CustomInput name="email" label="Email" placeholder="Enter valid email" type="text" classes="col-span-2" />
          <CustomInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter a password"
            classes="col-span-2"
          />
        </CustomForm>

        <DialogFooter className="flex w-full flex-col! items-center justify-center gap-2">
          <Button type="submit" form={formKey} className="mb-2 h-15 w-full" disabled={!formValid}>
            {verifying ? <RefreshCcwDot className="animate-spin-slow" /> : 'Log In'}
          </Button>
          <div className="flex w-full items-center-safe justify-center gap-1.75 px-5">
            <span className="bg-greyscale-200 h-px flex-1" />
            <span className="text-greyscale-400 text-sm">or</span>
            <span className="bg-greyscale-200 h-px flex-1" />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <span className="text-greyscale-500 text-xs">Don’t have an account?</span>
            <Button
              variant="ghost"
              className="text-greyscale-900! border-greyscale-900 p-0 text-sm"
              onClick={() => openModal('register')}
            >
              Sign Up
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
