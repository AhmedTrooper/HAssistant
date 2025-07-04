import { addToast, Button } from "@heroui/react";
import { Command } from "@tauri-apps/plugin-shell";

export default function Home() {
  const getDir = async () => {
    const cmd = Command.create("geminiCmd", [
      // "--prompt",
      // "who is messi in 20 words?",
      "--version"
    ]);
    try {
      const x = await cmd.execute();
      console.log(x.stdout);
       addToast({
        title: "Error occurred",
        description: x.stdout,
        color: "success",
        timeout: 3000,
      });
    } catch (err) {
      console.log(err);
      addToast({
        title: "Error occurred",
        description: err as string,
        color: "danger",
        timeout: 3000,
      });
    }
  };
  return (
    <div className="p-8">
      <h1>Homepage...</h1>
      <Button onPress={getDir}>Execute</Button>
    </div>
  );
}
