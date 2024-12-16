import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "./components/theme/theme-toggle";
import { useMutation } from '@tanstack/react-query'
import { registerClient } from "./api/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { colors } from "./lib/colors";

const registerForm = z.object({
  name: z.string(),
  document: z.string(),
  email: z.string().email(),
  color: z.string(),
  observation: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>

export function App() {
  const {
    register,
    handleSubmit,
    control
  } = useForm<RegisterForm>()
  const { toast } = useToast()
  const [cpf, setCpf] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutateAsync: registerClientFn } = useMutation({
    mutationFn: registerClient,
  })

  const handleCpfChange = (event: any) => {
    let value = event.target.value;

    value = value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    setCpf(value);
  }
  
  async function handleRegister(data: RegisterForm) {
    setIsSubmitted(true)

    try {
      await registerClientFn({
        name: data.name,
        document: data.document,
        email: data.email,
        color: data.color,
        observation: data.observation,
      })

      toast({
        title: "Cadastro feito com sucesso!",
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: error.response.data.message,
      })
      setIsSubmitted(false)
    }
  }

  return (
    <div className="h-screen items-center justify-center flex flex-col relative">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-2 text-center pb-5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Faça seu cadastro
        </h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" type="text" {...register('name')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document">CPF</Label>
            <Input id="document" type="text" {...register('document')} onChange={handleCpfChange} value={cpf} maxLength={14}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Cor predileta</Label>
            <Controller
              name="color"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        colors.map(color => (
                          <SelectItem value={color.value} key={color.value}>{color.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                )
              }}
            ></Controller>
          </div>
          <div className="space-y-2">
            <Label htmlFor="observation">Observações</Label>
            <Input id="observation" type="text" {...register('observation')} />
          </div>
          <Button disabled={isSubmitted}  className="w-full" type="submit">
            Cadastrar
          </Button>
        </form>      
      </div>
  );
}
