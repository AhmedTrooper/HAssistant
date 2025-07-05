import { addToast, Button, Spinner, Textarea } from "@heroui/react";
import { Command } from "@tauri-apps/plugin-shell";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

export default function Home() {
  const [dir, setDir] = useState<string>("");
  const [instruction, setInstruction] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDir = async () => {
    let singleLine = instruction.replace(/\s*\n\s*/g, " ").trim();
    if (dir) {
      singleLine += dir;
    }
    setIsLoading(true);
    const cmd = Command.create("geminiCmd", [
      "--model",
      "gemini-2.5-flash",
      "--prompt",
      // "who is messi in 20 words?",
      // "--version",
      `${singleLine?.trim()}:if you don't understand the request,prompt show message to user at least of one line,If dont find/cant read write,let user know,but response should be ,no empty response`,
      "--yolo".trim(),
    ]);
    try {
      const x = await cmd.execute();
      console.log("Response is", x.stdout);
      addToast({
        title: "Successfull",
        description: x.stdout,
        color: "success",
        timeout: 1000,
      });
      setResponse(x.stdout);
    } catch (err) {
      console.log(err);
      addToast({
        title: "Error occurred pos2",
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
      setDir(`${file}`);
    } catch (error) {
      addToast({
        title: "Error occurred pos3",
        description: error as string,
        color: "danger",
        timeout: 3000,
      });
    }
  };

  return (
    <div className="p-8 grid gap-4">
      <h1>Added yolo support with no space</h1>
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
      <p className="max-w-[80vw] max-h-[80vh] custom-scrollbar space-x-4">{response}</p>
    </div>
  );
}
