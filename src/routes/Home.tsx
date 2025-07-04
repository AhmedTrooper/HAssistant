import { addToast, Button, Spinner, Textarea } from "@heroui/react";
import { Command } from "@tauri-apps/plugin-shell";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

export default function Home() {
  const [dir, setDir] = useState<string | null>(null);
  const [instruction, setInstruction] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDir = async () => {
    setIsLoading(true);
    const cmd = Command.create("geminiCmd", [
      "--prompt",
      // "who is messi in 20 words?",
      // "--version",
      `${instruction} inside the folder:${dir}`,
    ]);
    try {
      const x = await cmd.execute();
      console.log(x.stdout);
      addToast({
        title: "Successfull",
        description: x.stdout,
        color: "success",
        timeout: 1000,
      });
      setResponse(x.stdout);
    } catch (err) {
      // console.log(err);
      addToast({
        title: "Error occurred",
        description: err as string,
        color: "danger",
        timeout: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDir = async () => {
    try {
      const file = await open({
        multiple: false,
        directory: true,
      });
      console.log(file);
      setDir(file);
    } catch (error) {
      addToast({
        title: "Error occurred",
        description: error as string,
        color: "danger",
        timeout: 3000,
      });
    }
  };

  return (
    <div className="p-8 grid gap-4">
      <h1>Instruction: {instruction}</h1>
      <h1>{dir}</h1>
      <Textarea onChange={(e) => setInstruction(e.target.value)}></Textarea>
      <Button
        onPress={openDir}
        color="primary"
      >
        Open folder
      </Button>
      <Button onPress={getDir}>
        {isLoading ? <Spinner color="primary" /> : <span>Analyze</span>}
      </Button>
      <h1>Response : </h1>
      <p>{response}</p>
    </div>
  );
}
