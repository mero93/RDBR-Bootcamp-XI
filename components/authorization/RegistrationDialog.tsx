import { ChevronLeft, RefreshCcwDot } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

import { useModalStates } from '@/providers/ModalProvider';
import { RegisterForm, RegisterStep1Schema } from '@/types/authorization-schemas';
import { SchemaData } from '@/types/schema-registry';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { CustomForm } from '../ui/forms/CustomForm';
import { CustomInput } from '../ui/forms/CustomInput';
import { Heading } from '../ui/heading';
import Stepper from '../ui/Stepper';

export type FormKey = 'step1' | 'step2' | 'step3';

const formInitialCheckStatus: Record<FormKey, boolean> = {
  step1: false,
  step2: false,
  step3: false,
};

type RegistrationDialogProperties = {
  open: boolean;
  onOpenChange: (bool: boolean) => void;
};

export default function RegistrationDialog({ open, onOpenChange }: RegistrationDialogProperties) {
  const { closeModal, openModal } = useModalStates();
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState(1);
  const [completeForm, setCompleteForm] = useState<Partial<RegisterForm>>({});

  // Valid Steps
  const [step1Valid, setStep1Valid] = useState<boolean | undefined>();
  const [step2Valid, setStep2Valid] = useState<boolean | undefined>();
  const [step3Valid, setStep3Valid] = useState<boolean | undefined>();
  const validSteps = [step1Valid, step2Valid, step3Valid];
  const isFormValid =
    (step === 1 && step1Valid === true) || (step === 2 && step2Valid === true) || validSteps.every(Boolean) || true;

  // Animate Stepper
  const [height, setHeight] = useState<number | undefined>();
  const contentReference = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (contentReference.current) {
      setHeight(contentReference.current.offsetHeight);
    }
  }, [step]);

  const handleSubmit = async (data: SchemaData) => {
    const parsed = RegisterStep1Schema.safeParse(data);

    if (parsed.success) {
      try {
        setVerifying(true);

        console.log('data', parsed.data);

        setCompleteForm((previous) => ({ ...previous, ...parsed.data }));

        if (step === 3) {
          /// TODO: replace with actual api call

          await new Promise<void>((resolve) =>
            setTimeout(() => {
              resolve();
            }, 3000)
          );
        } else {
          stepForward();
        }
      } finally {
        setVerifying(false);
      }
    }
  };

  const stepBack = () => {
    console.log('step backward');
    setStep((previous) => Math.max((previous -= 1), 1));
  };

  const stepForward = () => {
    console.log('step forward');
    setStep((previous) => Math.min((previous += 1), 3));
  };

  const forms = [
    <CustomForm
      id={'step1'}
      key={'step1'}
      schemaKey={'RegisterStep1Schema'}
      onSubmit={handleSubmit}
      className="w-full"
      onValidationChange={setStep1Valid}
      defaultValues={completeForm}
    >
      <CustomInput
        name={'email'}
        label={'Email'}
        type={'text'}
        classes="col-span-2"
        placeholder="Enter valid email"
      ></CustomInput>
    </CustomForm>,

    <CustomForm
      id={'step2'}
      key={'step2'}
      schemaKey={'RegisterStep2Schema'}
      onSubmit={handleSubmit}
      className="w-full"
      onValidationChange={setStep2Valid}
      defaultValues={completeForm}
    >
      <CustomInput
        name={'password'}
        label={'Password'}
        type={'password'}
        classes="col-span-2"
        placeholder="Enter valid password"
      ></CustomInput>
      <CustomInput
        name={'confirmPassword'}
        label={'Confirm Password'}
        type={'password'}
        classes="col-span-2"
        placeholder="Re-enter password"
      ></CustomInput>
    </CustomForm>,

    <CustomForm
      id={'step3'}
      key={'step3'}
      schemaKey={'RegisterStep3Schema'}
      onSubmit={handleSubmit}
      className="w-full"
      onValidationChange={setStep3Valid}
      defaultValues={completeForm}
    >
      <CustomInput
        name={'username'}
        label={'Username'}
        type={'text'}
        classes="col-span-2"
        placeholder="Enter valid username"
      ></CustomInput>
    </CustomForm>,
  ];

  const renderStep = (step: number) => {
    return (
      <div
        style={{
          height: height == undefined ? 'auto' : `calc(${height}px + 2.25rem)`,
          transition: 'height 0.3s ease-in-out',
        }}
        className="relative w-full overflow-hidden"
      >
        <div ref={contentReference}>{forms[step - 1]}</div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90%] flex-col items-center gap-0 p-12.5 sm:max-w-115" onClose={closeModal}>
        <Button variant="simpleIcon" className="absolute top-[1.28125rem] left-3.75" onClick={() => stepBack()}>
          <ChevronLeft />
          <span className="sr-only">Step Back</span>
        </Button>
        <DialogHeader className="flex w-full flex-col items-center justify-start">
          <DialogTitle>
            <Heading variant="h2">Create Account</Heading>
          </DialogTitle>
          <DialogDescription className="mb-4 text-sm">Join and start learning today</DialogDescription>
          <Stepper
            validSteps={validSteps}
            totalSteps={3}
            currentStep={step}
            formInitialCheckStatus={formInitialCheckStatus}
          />
        </DialogHeader>
        {renderStep(step)}
        <DialogFooter className="flex w-full flex-col! items-center justify-center gap-2">
          <Button type="submit" form={`step${step}`} className="mb-2 h-15 w-full" disabled={!isFormValid}>
            {verifying ? <RefreshCcwDot className="animate-spin-slow" /> : step === 3 ? 'Sign Up' : 'Next'}
          </Button>
          <div className="flex w-full items-center-safe justify-center gap-1.75 px-5">
            <span className="bg-greyscale-200 h-px flex-1" />
            <span className="text-greyscale-400 text-sm">or</span>
            <span className="bg-greyscale-200 h-px flex-1" />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <span className="text-greyscale-500 text-xs">Already have an account?</span>
            <Button
              variant="ghost"
              className="text-greyscale-900! border-greyscale-900 p-0 text-sm"
              onClick={() => openModal('login')}
            >
              Log In
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
