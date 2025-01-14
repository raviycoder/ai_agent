import Image from "next/image";
import { RegisterForm } from "@/components/register-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              <Image src="/logo.svg" alt="logo" width={20} height={20} />
            </div>
            AI Agents
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <h1 className="absolute text-4xl text-neutral-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] top-[8%] left-1/2 -translate-x-1/2 translate-y-1/2 z-10">Hey Sign Up Now</h1>
        <Image
          width={500}
          height={500}
          src="/7xm.xyz847312.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}