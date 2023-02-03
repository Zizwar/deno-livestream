export default async ({ cmd }) => {
  const td = (d: Uint8Array) => new TextDecoder().decode(d);
  if (cmd) return console.error("cmd empety !!");
  const p = await Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });
  const { code, success } = await p.status();
  console.log({ code, success });
  const out = td(await p.output()).trim();
  const error = td(await p.stderrOutput()).trim();
  return { code, success, out, error, p };
};
