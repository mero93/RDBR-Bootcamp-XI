import { cn } from '@/lib/utils';

import { FormKey } from '../authorization/RegistrationDialog';

function isFormKey(key: string): key is FormKey {
  return key === 'step1' || key === 'step2' || key === 'step3';
}

type StepperProperties = {
  currentStep: number;
  totalSteps: number;
  formInitialCheckStatus: Record<FormKey, boolean>;
  validSteps: (boolean | undefined)[];
  className?: string;
};

export default function Stepper({
  currentStep,
  totalSteps,
  formInitialCheckStatus,
  validSteps,
  className,
}: StepperProperties) {
  const chooseColor = (index: number) => {
    if (checkIfInitialCheck(index + 1) && validSteps[index] === false) {
      return 'bg-error';
    }

    if (currentStep === index + 1) {
      return 'bg-purple-200';
    }

    if (validSteps[index]) {
      return 'bg-purple-500';
    }

    return 'bg-purple-50';
  };

  const checkIfInitialCheck = (step: number) => {
    const key = `step${step}`;
    if (isFormKey(key)) {
      return formInitialCheckStatus[key];
    }
    return false;
  };

  return (
    <div className={cn('flex w-full items-center gap-2', className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span key={index} className={cn('h-2 flex-1 rounded-xl transition-colors duration-300', chooseColor(index))} />
      ))}
    </div>
  );
}
