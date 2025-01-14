"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import {useState } from "react";
import useAgent, { Agent } from "@/hooks/useAgent";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 to 100 characters" })
    .max(100),
  task: z.string().min(3, { message: "Task must be at least 3 characters" }),
  icon: z.string(), // Not restricting the length for emoji flexibility
});

export function CreateAgent({onAgentCreate}:{onAgentCreate: (agents: Agent) => void}) {
  const [selectedEmoji, setSelectedEmoji] = useState(""); // State to store selected emoji
  const [isOpen, setIsOpen] = useState(false);

  const { createAgent } = useAgent();
  const { data: user, loading, error } = useFetchData("/api/auth/user");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      task: "",
      icon: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!loading && !error) {
      if (!user) return null;
      const {_id} = (user as { user: string; })?.user as unknown as { _id: string };
      console.log("creaeted", _id);
      if (values.icon === "") {
        const data = {
          title: values.title,
          task: values.task,
          userId: _id,
        };
        createAgent(data).then((agent) => onAgentCreate(agent.agent));
      } else {
        const data = {
          title: values.title,
          task: values.task,
          icon: values.icon,
          userId: _id,
        };
        createAgent(data).then((agent) => {console.log('agent', agent) 
          onAgentCreate(agent.agent)});
      }
      toast({
        title: "Success",
        description: "Agent created successfully",
      })
      form.reset();
      setIsOpen(false);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Agent
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>🤖 Create Agent</DialogTitle>
          <DialogDescription>
            Fill out the details below to create a new agent.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="example: summarize" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Task*</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="example: there is a task to do..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mr-3">Agent Icon:</FormLabel>
                    <FormControl>
                      <Popover
                        open={open}
                        onOpenChange={(open) => setOpen(open)}
                      >
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {selectedEmoji || "Select Icon"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                          <EmojiPicker
                            onEmojiClick={(emojiObject) => {
                              const emoji = emojiObject.emoji;
                              setSelectedEmoji(emoji); // Update preview
                              field.onChange(emoji); // Update form value
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Create Agent</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
